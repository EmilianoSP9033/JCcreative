import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, ZoomIn } from 'lucide-react';
import { Screen } from '../types';

interface GalleryProps {
  onNavigate: (screen: Screen) => void;
}

const CATEGORIES = ['Todos', 'Tarjetas', 'Lonas', 'Playeras', 'Stickers', 'Otros'];

const GALLERY_ITEMS = [
  { id: 1, category: 'Tarjetas', src: 'https://picsum.photos/seed/card1/600/800', title: 'Tarjetas Premium Mate', rotate: '-rotate-2' },
  { id: 2, category: 'Lonas', src: 'https://picsum.photos/seed/banner1/800/600', title: 'Lona Gran Formato', rotate: 'rotate-1' },
  { id: 3, category: 'Playeras', src: 'https://picsum.photos/seed/shirt1/600/600', title: 'Playera Algodón Impresa', rotate: 'rotate-3' },
  { id: 4, category: 'Stickers', src: 'https://picsum.photos/seed/sticker1/500/500', title: 'Stickers Holográficos', rotate: '-rotate-1' },
  { id: 5, category: 'Tarjetas', src: 'https://picsum.photos/seed/card2/600/400', title: 'Tarjetas con Barniz UV', rotate: 'rotate-2' },
  { id: 6, category: 'Otros', src: 'https://picsum.photos/seed/mug1/600/600', title: 'Tazas Sublimadas', rotate: '-rotate-3' },
  { id: 7, category: 'Playeras', src: 'https://picsum.photos/seed/shirt2/600/800', title: 'Playera Dry-Fit', rotate: 'rotate-1' },
  { id: 8, category: 'Lonas', src: 'https://picsum.photos/seed/banner2/800/500', title: 'Banner Roll-up', rotate: '-rotate-2' },
  { id: 9, category: 'Stickers', src: 'https://picsum.photos/seed/sticker2/600/600', title: 'Stickers Troquelados', rotate: 'rotate-2' },
];

export default function Gallery({ onNavigate }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedImage, setSelectedImage] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(item => 
    activeCategory === 'Todos' || item.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">
          Nuestra Galería
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Inspírate con algunos de nuestros mejores trabajos. Calidad y detalle en cada impresión.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
              activeCategory === cat
                ? 'bg-[#FFD700] text-slate-900 dark:bg-[#00E5FF] dark:text-slate-900 shadow-lg shadow-[#FFD700]/20 dark:shadow-[#00E5FF]/20'
                : 'bg-white dark:bg-[#0D1B3E] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`break-inside-avoid ${item.rotate} transition-transform duration-500 hover:rotate-0 hover:z-10 relative group cursor-pointer`}
              onClick={() => setSelectedImage(item)}
            >
              {/* Polaroid Card */}
              <div className="bg-white dark:bg-[#0D1B3E] p-4 pb-12 rounded-lg shadow-[0_10px_30px_rgba(255,215,0,0.15)] dark:shadow-[0_10px_30px_rgba(0,229,255,0.1)] border border-slate-100 dark:border-slate-800 transition-all duration-300 group-hover:shadow-[0_20px_40px_rgba(255,215,0,0.25)] dark:group-hover:shadow-[0_20px_40px_rgba(0,229,255,0.2)]">
                <div className="relative overflow-hidden rounded bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="text-white w-10 h-10" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-0 w-full text-center px-4">
                  <p className="font-display font-bold text-slate-800 dark:text-slate-200 text-sm truncate">
                    {item.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          >
            <div 
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            ></div>
            
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative z-10 bg-white dark:bg-[#0D1B3E] rounded-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-2/3 bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4 min-h-[400px]">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title} 
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="w-full md:w-1/3 p-8 flex flex-col justify-center">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FFD700] dark:text-[#00E5FF] mb-2">
                  {selectedImage.category}
                </span>
                <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">
                  {selectedImage.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                  ¿Te gusta este estilo? Podemos hacer algo similar para tu marca. Contáctanos para cotizar tu proyecto.
                </p>
                
                <button 
                  onClick={() => {
                    setSelectedImage(null);
                    onNavigate('quote');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-slate-900 bg-[#FFD700] dark:bg-[#00E5FF] hover:bg-[#FFD700]/90 dark:hover:bg-[#00E5FF]/90 transition-all shadow-lg shadow-[#FFD700]/20 dark:shadow-[#00E5FF]/20"
                >
                  <MessageCircle size={20} />
                  Cotizar Proyecto Similar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
