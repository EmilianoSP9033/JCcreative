/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Sun, Moon, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Home from './components/Home';
import Catalog from './components/Catalog';
import Editor from './components/Editor';
import Checkout from './components/Checkout';
import Quote from './components/Quote';
import Gallery from './components/Gallery';
import Account from './components/Account';
import Admin from './components/Admin';
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
      {currentScreen !== 'editor' && currentScreen !== 'admin' && (
        <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('home')}>
              <div className="relative w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <span className="relative z-10 font-display text-lg tracking-tighter">JC</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-bold tracking-tight leading-none">JC creative</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-400 dark:text-slate-500">Design Studio</span>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6 pr-6 border-r border-slate-200 dark:border-slate-800">
                <button 
                  onClick={() => navigate('home')} 
                  className={`relative text-sm font-semibold tracking-wide transition-colors py-2 group ${currentScreen === 'home' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  Inicio
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transition-transform duration-300 origin-left ${currentScreen === 'home' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </button>
                <button 
                  onClick={() => navigate('catalog')} 
                  className={`relative text-sm font-semibold tracking-wide transition-colors py-2 group ${currentScreen === 'catalog' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  Catálogo
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transition-transform duration-300 origin-left ${currentScreen === 'catalog' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </button>
                <button 
                  onClick={() => navigate('quote')} 
                  className={`relative text-sm font-semibold tracking-wide transition-colors py-2 group ${currentScreen === 'quote' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  Cotizar
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transition-transform duration-300 origin-left ${currentScreen === 'quote' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </button>
                <button 
                  onClick={() => navigate('gallery')} 
                  className={`relative text-sm font-semibold tracking-wide transition-colors py-2 group ${currentScreen === 'gallery' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  Galería
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transition-transform duration-300 origin-left ${currentScreen === 'gallery' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </button>
                <button 
                  onClick={() => navigate('login')} 
                  className={`relative text-sm font-semibold tracking-wide transition-colors py-2 group ${currentScreen === 'login' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  Mi Cuenta
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transition-transform duration-300 origin-left ${currentScreen === 'login' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all duration-200" aria-label="Search">
                  <Search size={20} />
                </button>
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)} 
                  className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all duration-200"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button 
                  onClick={() => navigate('checkout')}
                  className="group flex items-center gap-3 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white rounded-full text-sm font-bold transition-all duration-300 shadow-lg shadow-slate-900/10 dark:shadow-white/5"
                >
                  <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="border-l border-white/20 dark:border-slate-900/20 pl-3">2</span>
                </button>
              </div>
            </nav>

            <div className="md:hidden flex items-center gap-2">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="md:hidden absolute top-20 left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 py-8 px-6 flex flex-col gap-6 shadow-2xl overflow-hidden"
              >
                <motion.button 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                  onClick={() => navigate('home')} 
                  className={`text-2xl font-display font-bold text-left ${currentScreen === 'home' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  Inicio
                </motion.button>
                <motion.button 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                  onClick={() => navigate('catalog')} 
                  className={`text-2xl font-display font-bold text-left ${currentScreen === 'catalog' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  Catálogo
                </motion.button>
                <motion.button 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                  onClick={() => navigate('quote')} 
                  className={`text-2xl font-display font-bold text-left ${currentScreen === 'quote' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  Cotizar
                </motion.button>
                <motion.button 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                  onClick={() => navigate('gallery')} 
                  className={`text-2xl font-display font-bold text-left ${currentScreen === 'gallery' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  Galería
                </motion.button>
                <motion.button 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                  onClick={() => navigate('login')} 
                  className={`text-2xl font-display font-bold text-left ${currentScreen === 'login' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  Mi Cuenta
                </motion.button>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                  className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                      <ShoppingCart size={20} />
                    </div>
                    <span className="font-bold">Carrito</span>
                  </div>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">0 items</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      )}

      <main className={`${currentScreen !== 'editor' && currentScreen !== 'admin' ? 'pt-20' : ''} min-h-screen`}>
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
            {currentScreen === 'editor' && <Editor onNavigate={navigate} product={selectedProduct || undefined} />}
            {currentScreen === 'checkout' && <Checkout onNavigate={navigate} product={selectedProduct || undefined} />}
            {currentScreen === 'quote' && <Quote onNavigate={navigate} initialProduct={selectedProduct || undefined} />}
            {currentScreen === 'gallery' && <Gallery onNavigate={navigate} />}
            {currentScreen === 'login' && <Account onNavigate={navigate} />}
            {currentScreen === 'admin' && <Admin onNavigate={navigate} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
