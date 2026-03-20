import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Lock, Package, Palette, LogOut, ChevronRight, Edit3 } from 'lucide-react';
import { Screen } from '../types';

interface AccountProps {
  onNavigate: (screen: Screen) => void;
}

// Mock data
const SAVED_DESIGNS = [
  { id: 1, name: 'Tarjeta Personal', type: 'Tarjetas', date: '15 Mar 2026', image: 'https://picsum.photos/seed/design1/400/300' },
  { id: 2, name: 'Lona Expo', type: 'Lonas', date: '10 Mar 2026', image: 'https://picsum.photos/seed/design2/400/300' },
];

const ORDER_HISTORY = [
  { id: 'JC-1042', date: '12 Mar 2026', status: 'En producción', total: 450.00, items: 1 },
  { id: 'JC-0985', date: '28 Feb 2026', status: 'Entregado', total: 1250.00, items: 3 },
];

export default function Account({ onNavigate }: AccountProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [activeTab, setActiveTab] = useState('designs'); // 'designs' | 'orders' | 'profile'

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white dark:bg-[#0D1B3E] rounded-3xl p-8 shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-800/50">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#FFD700]/10 dark:bg-[#00E5FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={32} className="text-[#FFD700] dark:text-[#00E5FF]" />
            </div>
            <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
              {isLoginView ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              {isLoginView ? 'Accede a tus diseños y pedidos' : 'Únete a JC Creative'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLoginView && (
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nombre completo</label>
                <div className="relative">
                  <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" required className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FFD700] dark:focus:ring-[#00E5FF] focus:border-transparent transition-all" placeholder="Juan Pérez" />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Correo electrónico</label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" required className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FFD700] dark:focus:ring-[#00E5FF] focus:border-transparent transition-all" placeholder="tu@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Contraseña</label>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="password" required className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FFD700] dark:focus:ring-[#00E5FF] focus:border-transparent transition-all" placeholder="••••••••" />
              </div>
            </div>

            <button type="submit" className="w-full py-3 mt-6 rounded-xl font-bold text-slate-900 bg-[#FFD700] dark:bg-[#00E5FF] hover:bg-[#FFD700]/90 dark:hover:bg-[#00E5FF]/90 transition-all shadow-lg shadow-[#FFD700]/20 dark:shadow-[#00E5FF]/20">
              {isLoginView ? 'Entrar' : 'Registrarse'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLoginView(!isLoginView)}
              className="text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {isLoginView ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Sidebar */}
        <div className="w-full lg:w-64 shrink-0 space-y-2">
          <div className="bg-white dark:bg-[#0D1B3E] rounded-3xl p-6 mb-6 shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-800/50 text-center">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto mb-4 overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">Juan Pérez</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">juan@ejemplo.com</p>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('designs')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'designs' 
                  ? 'bg-[#FFD700]/10 dark:bg-[#00E5FF]/10 text-[#FFD700] dark:text-[#00E5FF]' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Palette size={20} /> Mis Diseños
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'orders' 
                  ? 'bg-[#FFD700]/10 dark:bg-[#00E5FF]/10 text-[#FFD700] dark:text-[#00E5FF]' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Package size={20} /> Mis Pedidos
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'profile' 
                  ? 'bg-[#FFD700]/10 dark:bg-[#00E5FF]/10 text-[#FFD700] dark:text-[#00E5FF]' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <User size={20} /> Mi Perfil
            </button>
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
              <button 
                onClick={() => onNavigate('admin')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all"
              >
                <Lock size={20} /> Panel de Admin
              </button>
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all mt-2"
              >
                <LogOut size={20} /> Cerrar Sesión
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            
            {activeTab === 'designs' && (
              <motion.div
                key="designs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Mis Diseños</h2>
                  <button 
                    onClick={() => onNavigate('catalog')}
                    className="px-4 py-2 rounded-lg font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors text-sm"
                  >
                    Nuevo Diseño
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {SAVED_DESIGNS.map(design => (
                    <div key={design.id} className="bg-white dark:bg-[#0D1B3E] rounded-2xl overflow-hidden shadow-lg dark:shadow-none border border-slate-100 dark:border-slate-800/50 group">
                      <div className="aspect-video bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                        <img src={design.image} alt={design.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                          <button 
                            onClick={() => onNavigate('editor')}
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 hover:bg-[#FFD700] transition-colors"
                          >
                            <Edit3 size={20} />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-slate-900 dark:text-white">{design.name}</h3>
                          <span className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-500 dark:text-slate-400">{design.type}</span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Modificado: {design.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-8">Mis Pedidos</h2>
                
                <div className="space-y-4">
                  {ORDER_HISTORY.map(order => (
                    <div key={order.id} className="bg-white dark:bg-[#0D1B3E] rounded-2xl p-6 shadow-lg dark:shadow-none border border-slate-100 dark:border-slate-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-slate-900 dark:text-white text-lg">Pedido {order.id}</h3>
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            order.status === 'Entregado' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{order.date} • {order.items} artículo(s)</p>
                      </div>
                      
                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                        <span className="font-bold text-slate-900 dark:text-white text-xl">${order.total.toFixed(2)}</span>
                        <button className="p-2 text-slate-400 hover:text-[#FFD700] dark:hover:text-[#00E5FF] transition-colors">
                          <ChevronRight size={24} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-8">Mi Perfil</h2>
                
                <div className="bg-white dark:bg-[#0D1B3E] rounded-3xl p-8 shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-800/50 max-w-2xl">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nombre</label>
                        <input type="text" defaultValue="Juan" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FFD700] dark:focus:ring-[#00E5FF] focus:border-transparent transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Apellidos</label>
                        <input type="text" defaultValue="Pérez" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FFD700] dark:focus:ring-[#00E5FF] focus:border-transparent transition-all" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Correo electrónico</label>
                      <input type="email" defaultValue="juan@ejemplo.com" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FFD700] dark:focus:ring-[#00E5FF] focus:border-transparent transition-all" />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Teléfono</label>
                      <input type="tel" defaultValue="55 1234 5678" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FFD700] dark:focus:ring-[#00E5FF] focus:border-transparent transition-all" />
                    </div>

                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                      <button className="px-8 py-3 rounded-xl font-bold text-slate-900 bg-[#FFD700] dark:bg-[#00E5FF] hover:bg-[#FFD700]/90 dark:hover:bg-[#00E5FF]/90 transition-all shadow-lg shadow-[#FFD700]/20 dark:shadow-[#00E5FF]/20">
                        Guardar Cambios
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
