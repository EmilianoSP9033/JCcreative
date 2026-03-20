import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, ShoppingBag, Users, Package, TrendingUp, DollarSign, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Screen } from '../types';

interface AdminProps {
  onNavigate: (screen: Screen) => void;
}

const STATS = [
  { title: 'Ventas del Mes', value: '$45,230', icon: DollarSign, trend: '+12%', color: 'text-green-500' },
  { title: 'Pedidos Activos', value: '24', icon: ShoppingBag, trend: '+5%', color: 'text-blue-500' },
  { title: 'Nuevos Clientes', value: '18', icon: Users, trend: '+2%', color: 'text-purple-500' },
  { title: 'Diseños Pendientes', value: '7', icon: Clock, trend: '-3%', color: 'text-orange-500' },
];

const RECENT_ORDERS = [
  { id: 'JC-1045', customer: 'María González', product: 'Tarjetas de Presentación', date: 'Hace 2 horas', status: 'Pendiente Diseño', amount: 350.00 },
  { id: 'JC-1044', customer: 'Carlos Ruiz', product: 'Lona Publicitaria', date: 'Hace 5 horas', status: 'En Producción', amount: 1200.00 },
  { id: 'JC-1043', customer: 'Ana López', product: 'Playeras Personalizadas', date: 'Ayer', status: 'Listo para Entrega', amount: 850.00 },
  { id: 'JC-1042', customer: 'Empresa XYZ', product: 'Stickers Troquelados', date: 'Ayer', status: 'Entregado', amount: 450.00 },
];

export default function Admin({ onNavigate }: AdminProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#0D1B3E] border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-8 h-8 bg-[#00E5FF] rounded-lg flex items-center justify-center text-slate-900 font-bold shadow-lg shadow-[#00E5FF]/20">
              <span className="font-display text-sm tracking-tighter">JC</span>
            </div>
            <span className="font-display font-bold text-slate-900 dark:text-white">Admin Panel</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'dashboard' 
                ? 'bg-[#FFD700]/10 dark:bg-[#00E5FF]/10 text-[#FFD700] dark:text-[#00E5FF]' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'orders' 
                ? 'bg-[#FFD700]/10 dark:bg-[#00E5FF]/10 text-[#FFD700] dark:text-[#00E5FF]' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ShoppingBag size={20} /> Pedidos
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'products' 
                ? 'bg-[#FFD700]/10 dark:bg-[#00E5FF]/10 text-[#FFD700] dark:text-[#00E5FF]' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Package size={20} /> Productos
          </button>
          <button 
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'customers' 
                ? 'bg-[#FFD700]/10 dark:bg-[#00E5FF]/10 text-[#FFD700] dark:text-[#00E5FF]' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Users size={20} /> Clientes
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
              {activeTab === 'dashboard' && 'Resumen General'}
              {activeTab === 'orders' && 'Gestión de Pedidos'}
              {activeTab === 'products' && 'Inventario de Productos'}
              {activeTab === 'customers' && 'Directorio de Clientes'}
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {STATS.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="bg-white dark:bg-[#0D1B3E] rounded-2xl p-6 shadow-lg dark:shadow-none border border-slate-100 dark:border-slate-800/50">
                        <div className="flex justify-between items-start mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 ${stat.color}`}>
                            <Icon size={24} />
                          </div>
                          <span className={`text-sm font-bold ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                            {stat.trend}
                          </span>
                        </div>
                        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-1">{stat.title}</h3>
                        <p className="text-2xl font-display font-bold text-slate-900 dark:text-white">{stat.value}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Recent Orders Table */}
                <div className="bg-white dark:bg-[#0D1B3E] rounded-2xl shadow-lg dark:shadow-none border border-slate-100 dark:border-slate-800/50 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">Pedidos Recientes</h2>
                    <button className="text-sm font-bold text-[#FFD700] dark:text-[#00E5FF] hover:underline">Ver todos</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm">
                          <th className="p-4 font-bold">ID Pedido</th>
                          <th className="p-4 font-bold">Cliente</th>
                          <th className="p-4 font-bold">Producto</th>
                          <th className="p-4 font-bold">Fecha</th>
                          <th className="p-4 font-bold">Estado</th>
                          <th className="p-4 font-bold">Total</th>
                          <th className="p-4 font-bold text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {RECENT_ORDERS.map((order) => (
                          <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="p-4 font-bold text-slate-900 dark:text-white">{order.id}</td>
                            <td className="p-4 text-slate-600 dark:text-slate-300">{order.customer}</td>
                            <td className="p-4 text-slate-600 dark:text-slate-300">{order.product}</td>
                            <td className="p-4 text-slate-500 dark:text-slate-400 text-sm">{order.date}</td>
                            <td className="p-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                order.status === 'Pendiente Diseño' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                                order.status === 'En Producción' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                                order.status === 'Listo para Entrega' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                                'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="p-4 font-bold text-slate-900 dark:text-white">${order.amount.toFixed(2)}</td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button className="p-2 text-slate-400 hover:text-[#00E5FF] transition-colors" title="Ver Detalles">
                                  <Eye size={18} />
                                </button>
                                {order.status === 'Pendiente Diseño' && (
                                  <>
                                    <button className="p-2 text-slate-400 hover:text-green-500 transition-colors" title="Aprobar Diseño">
                                      <CheckCircle size={18} />
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Rechazar Diseño">
                                      <XCircle size={18} />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Placeholder for other tabs */}
            {activeTab !== 'dashboard' && (
              <motion.div
                key="other"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center h-[60vh] text-slate-500 dark:text-slate-400"
              >
                <TrendingUp size={64} className="mb-4 opacity-20" />
                <h2 className="text-2xl font-bold mb-2">Módulo en Construcción</h2>
                <p>Esta sección estará disponible próximamente.</p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
    </div>
  );
}
