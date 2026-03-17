import React, { useState } from 'react';
import { Search, Filter, Palette } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen, Product } from '../types';

interface CatalogProps {
  onNavigate: (screen: Screen, product?: Product) => void;
}

const products: Product[] = [
  { id: '1', name: 'Camiseta Premium Algodón', category: 'Camisas', price: 24.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800', variants: ['Cuello Redondo', 'Cuello V'], type: 'apparel' },
  { id: '2', name: 'Camisa Polo Ejecutiva', category: 'Camisas', price: 34.50, image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&q=80&w=800', variants: ['Algodón', 'Dry-Fit'], type: 'apparel' },
  { id: '3', name: 'Gorra Trucker', category: 'Gorras', price: 15.00, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800', variants: ['Malla Trasera', 'Frente Blanco'], type: 'apparel' },
  { id: '4', name: 'Gorra Snapback', category: 'Gorras', price: 18.50, image: 'https://images.unsplash.com/photo-1556306535-0f09a536f01f?auto=format&fit=crop&q=80&w=800', variants: ['Visera Plana', 'Estructurada'], type: 'apparel' },
  { id: '5', name: 'Taza Cerámica 11oz', category: 'Tazas', price: 12.00, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=800', variants: ['Blanca', 'Interior Color'], type: 'mug' },
  { id: '6', name: 'Taza Mágica', category: 'Tazas', price: 16.00, image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800', variants: ['Negro Mate'], type: 'mug' },
  { id: '7', name: 'Lona Publicitaria', category: 'Lonas', price: 45.00, image: 'https://images.unsplash.com/photo-1562613531-a2fa2b8006e2?auto=format&fit=crop&q=80&w=800', variants: ['2x1m', '3x2m', '4x3m'], type: 'banner' },
  { id: '8', name: 'Sudadera con Capucha', category: 'Sudaderas', price: 39.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800', variants: ['Con Cierre', 'Cerrada'], type: 'apparel' },
  { id: '9', name: 'Stickers Troquelados', category: 'Calcomanías', price: 0.50, image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&q=80&w=800', variants: ['Mate', 'Brillante', 'Holográfico'], type: 'sticker' },
];

const categories = ['Todos', 'Camisas', 'Gorras', 'Tazas', 'Lonas', 'Sudaderas', 'Calcomanías'];

export default function Catalog({ onNavigate }: CatalogProps) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p => {
    const matchCat = activeCategory === 'Todos' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <motion.aside 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-64 shrink-0"
        >
          <div className="sticky top-24">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
              <Filter size={20} className="text-blue-500" /> Categorías
            </h2>
            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-3 rounded-xl text-left font-medium transition-all whitespace-nowrap ${
                    activeCategory === cat 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden group flex flex-col shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square overflow-hidden relative bg-slate-100 dark:bg-slate-700">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-xs font-bold rounded text-slate-700 dark:text-slate-300">
                    {product.category}
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{product.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-1">
                    Variantes: {product.variants.join(', ')}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Desde</p>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">${product.price.toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => onNavigate('editor', product)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Palette size={16} /> Personalizar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <p className="text-slate-500 dark:text-slate-400 text-lg">No se encontraron productos que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
