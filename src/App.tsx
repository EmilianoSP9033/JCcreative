/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Sun, Moon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Home from './components/Home';
import Catalog from './components/Catalog';
import Editor from './components/Editor';
import Checkout from './components/Checkout';
import { Screen, Product } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navigate = (screen: Screen, product?: Product) => {
    if (product) setSelectedProduct(product);
    setCurrentScreen(screen);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-sans selection:bg-blue-500/30 transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('home')}>
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">
              JC
            </div>
            <span className="text-xl font-bold tracking-tight">JC creative</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate('home')} className={`text-sm font-medium hover:text-blue-500 transition-colors ${currentScreen === 'home' ? 'text-blue-600 dark:text-blue-500' : 'text-slate-600 dark:text-slate-300'}`}>Inicio</button>
            <button onClick={() => navigate('catalog')} className={`text-sm font-medium hover:text-blue-500 transition-colors ${currentScreen === 'catalog' ? 'text-blue-600 dark:text-blue-500' : 'text-slate-600 dark:text-slate-300'}`}>Catálogo</button>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">
              <ShoppingCart size={16} />
              <span>Carrito (0)</span>
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 px-4 flex flex-col gap-4 shadow-lg overflow-hidden"
            >
              <motion.button 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                onClick={() => navigate('home')} className="text-left text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium"
              >
                Inicio
              </motion.button>
              <motion.button 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                onClick={() => navigate('catalog')} className="text-left text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium"
              >
                Catálogo
              </motion.button>
              <motion.button 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium"
              >
                <ShoppingCart size={16} /> Carrito (0)
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-16 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {currentScreen === 'home' && <Home onNavigate={navigate} />}
            {currentScreen === 'catalog' && <Catalog onNavigate={navigate} />}
            {currentScreen === 'editor' && <Editor onNavigate={navigate} product={selectedProduct} />}
            {currentScreen === 'checkout' && <Checkout onNavigate={navigate} product={selectedProduct} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
