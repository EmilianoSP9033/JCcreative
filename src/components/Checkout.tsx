import React, { useState } from 'react';
import { CheckCircle, ArrowLeft, Truck, MessageCircle, Mail, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen, Product } from '../types';

interface CheckoutProps {
  onNavigate: (screen: Screen) => void;
  product?: Product | null;
}

export default function Checkout({ onNavigate, product }: CheckoutProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onNavigate('home');
    }, 4000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-800 p-8 rounded-3xl max-w-md w-full text-center border border-slate-200 dark:border-slate-700 shadow-2xl transition-colors duration-300"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="text-green-500" size={48} />
          </motion.div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">¡Pedido Confirmado!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Hemos recibido tu diseño y solicitud. Nos pondremos en contacto contigo en breve para confirmar los detalles de pago y envío.
          </p>
          <div className="animate-pulse text-blue-600 dark:text-blue-400 text-sm font-medium">
            Redirigiendo al inicio...
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => onNavigate('editor')}
        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 font-medium hover:translate-x-[-4px] transform duration-200"
      >
        <ArrowLeft size={20} /> Volver al Editor
      </motion.button>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1"
        >
          <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Finalizar Pedido</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                <Truck className="text-blue-500" /> Datos de Envío
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Nombre completo</label>
                  <input required type="text" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Teléfono</label>
                  <input required type="tel" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Correo electrónico</label>
                  <input required type="email" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Dirección completa</label>
                  <input required type="text" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Notas adicionales (Opcional)</label>
                  <textarea rows={3} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none transition-all"></textarea>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Método de Contacto Preferido</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label className="flex items-center justify-center gap-2 p-4 border border-blue-500 bg-blue-50 dark:bg-blue-500/10 rounded-xl cursor-pointer transition-all hover:shadow-md transform hover:-translate-y-1">
                  <input type="radio" name="contact" defaultChecked className="hidden" />
                  <MessageCircle size={20} className="text-blue-500" />
                  <span className="font-medium text-slate-900 dark:text-white">WhatsApp</span>
                </label>
                <label className="flex items-center justify-center gap-2 p-4 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-xl cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-md transform hover:-translate-y-1">
                  <input type="radio" name="contact" className="hidden" />
                  <Mail size={20} className="text-slate-500 dark:text-slate-400" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">Correo</span>
                </label>
                <label className="flex items-center justify-center gap-2 p-4 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-xl cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-md transform hover:-translate-y-1">
                  <input type="radio" name="contact" className="hidden" />
                  <Phone size={20} className="text-slate-500 dark:text-slate-400" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">Llamada</span>
                </label>
              </div>
            </motion.div>

            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
            >
              Confirmar Pedido
            </motion.button>
          </form>
        </motion.div>

        {/* Order Summary */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full lg:w-96 shrink-0"
        >
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden sticky top-24 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 transition-colors">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Resumen del Diseño</h2>
            </div>
            
            <div className="aspect-square bg-slate-100 dark:bg-slate-900 relative transition-colors">
              {product ? (
                <img src={product.image} alt="Tu diseño" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600">Sin diseño</div>
              )}
              <div className="absolute inset-0 border-4 border-white/50 dark:border-slate-800/50 pointer-events-none transition-colors" />
              <div className="absolute bottom-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                Vista Previa
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">{product?.name || 'Producto Personalizado'}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Talla/Tamaño: M</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Cantidad: 1</p>
                </div>
                <p className="font-bold text-blue-600 dark:text-blue-400">${(product?.price || 0).toFixed(2)}</p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 transition-colors">
                <div className="flex justify-between items-center mb-2 text-sm text-slate-500 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span>${(product?.price || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-4 text-sm text-slate-500 dark:text-slate-400">
                  <span>Envío (Estimado)</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-slate-900 dark:text-white">
                  <span>Total</span>
                  <span className="text-blue-600 dark:text-blue-400">${((product?.price || 0) + 5).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
