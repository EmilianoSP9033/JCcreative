import React, { useState } from 'react';
import { Search, Filter, PenTool, MessageCircle, Palette } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen, Product } from '../types';

interface CatalogProps {
  onNavigate: (screen: Screen, product?: Product) => void;
}

const products: Product[] = [
  { id: '1', name: 'Tarjetas de Presentación', category: 'Tarjetas', price: 199.00, image: 'https://picsum.photos/seed/cards/800/600', variants: ['Mate', 'Brillante', 'Texturizado'], type: 'apparel' },
  { id: '2', name: 'Lonas Publicitarias', category: 'Lonas', price: 299.00, image: 'https://picsum.photos/seed/banner/800/600', variants: ['1x1m', '2x1m', '3x2m'], type: 'banner' },
  { id: '3', name: 'Playeras Personalizadas', category: 'Playeras', price: 189.00, image: 'https://picsum.photos/seed/tshirt/800/600', variants: ['Algodón', 'Dry-Fit'], type: 'apparel' },
  { id: '4', name: 'Flyers Promocionales', category: 'Flyers', price: 59.00, image: 'https://picsum.photos/seed/flyer/800/600', variants: ['Media Carta', 'Cuarto de Carta'], type: 'apparel' },
  { id: '5', name: 'Sellos de Goma', category: 'Sellos', price: 150.00, image: 'https://picsum.photos/seed/stamp/800/600', variants: ['Madera', 'Automático'], type: 'apparel' },
  { id: '6', name: 'Tazas Sublimadas', category: 'Tazas', price: 129.00, image: 'https://picsum.photos/seed/mug/800/600', variants: ['Blanca', 'Mágica', 'Interior Color'], type: 'mug' },
  { id: '7', name: 'Stickers Troquelados', category: 'Stickers', price: 49.00, image: 'https://picsum.photos/seed/sticker/800/600', variants: ['Mate', 'Brillante', 'Holográfico'], type: 'sticker' },
  { id: '8', name: 'Banners Roll-up', category: 'Banners', price: 399.00, image: 'https://picsum.photos/seed/rollup/800/600', variants: ['80x200cm', '85x200cm'], type: 'banner' },
  { id: '9', name: 'Calendarios', category: 'Calendarios', price: 89.00, image: 'https://picsum.photos/seed/calendar/800/600', variants: ['Pared', 'Escritorio', 'Bolsillo'], type: 'apparel' },
];

const categories = ['Todos', 'Tarjetas', 'Lonas', 'Playeras', 'Flyers', 'Sellos', 'Tazas', 'Stickers', 'Banners', 'Calendarios'];

export default function Catalog({ onNavigate }: CatalogProps) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p => {
    const matchCat = activeCategory === 'Todos' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">
          Nuestro Catálogo
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Explora nuestra amplia gama de productos impresos de alta calidad. Personaliza en línea o solicita una cotización.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Sidebar / Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-28">
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0D1B3E] border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00E5FF] focus:border-transparent transition-all shadow-sm"
              />
            </div>

            <div className="bg-white dark:bg-[#0D1B3E] rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800/50">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                <Filter size={16} className="text-[#00E5FF]" /> Categorías
              </h2>
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap text-left ${
                        isActive 
                          ? 'bg-[#FFD700] text-slate-900 dark:bg-[#00E5FF] dark:text-slate-900 shadow-md' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group flex flex-col bg-white dark:bg-[#0D1B3E] rounded-2xl overflow-hidden shadow-md hover:shadow-xl dark:shadow-none dark:border dark:border-slate-800 hover:dark:border-[#00E5FF]/50 hover:dark:shadow-[0_0_20px_rgba(0,229,255,0.15)] transition-all duration-300 border-t-4 border-t-[#FFD700] dark:border-t-transparent"
              >
                <div className="aspect-[4/3] overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 dark:text-white shadow-sm">
                    {product.category}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="mt-auto pt-4 flex items-end justify-between mb-6">
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Desde</span>
                      <span className="text-2xl font-bold text-[#00E5FF] dark:text-[#00E5FF]">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => onNavigate('quote')}
                      className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      <MessageCircle size={16} />
                      Cotizar
                    </button>
                    <button 
                      onClick={() => onNavigate('editor', product)}
                      className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold bg-[#00E5FF] text-slate-900 hover:bg-[#00E5FF]/90 hover:shadow-lg hover:shadow-[#00E5FF]/20 transition-all"
                    >
                      <PenTool size={16} />
                      Diseñar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-[#0D1B3E] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <Palette className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No se encontraron productos</h3>
              <p className="text-slate-500 dark:text-slate-400">Intenta con otros términos de búsqueda o selecciona otra categoría.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
