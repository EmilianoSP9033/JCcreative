import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, CreditCard, Truck, MapPin, ChevronRight, Trash2, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Screen, Product, CartItem } from '../types';

interface CheckoutProps {
  onNavigate: (screen: Screen) => void;
  product?: Product; // If coming directly from "Buy Now"
}

// Mock cart data
const MOCK_CART: CartItem[] = [
  {
    product: {
      id: '1',
      name: 'Tarjetas de Presentación',
      category: 'Tarjetas',
      price: 250,
      image: 'https://picsum.photos/seed/card1/400/300',
      type: 'card'
    },
    quantity: 100,
    customization: 'Diseño personalizado - Frente y Vuelta'
  },
  {
    product: {
      id: '2',
      name: 'Lona Publicitaria',
      category: 'Lonas',
      price: 450,
      image: 'https://picsum.photos/seed/banner1/400/300',
      type: 'banner'
    },
    quantity: 1,
    customization: 'Diseño: "Gran Apertura"'
  }
];

export default function Checkout({ onNavigate, product }: CheckoutProps) {
  // If a product is passed directly, use it, otherwise use mock cart
  const [cartItems, setCartItems] = useState<CartItem[]>(
    product ? [{ product, quantity: 1, customization: 'Diseño personalizado' }] : MOCK_CART
  );

  const [shippingMethod, setShippingMethod] = useState('delivery'); // 'delivery' | 'pickup'
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'transfer' | 'cash'

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shippingCost = shippingMethod === 'delivery' ? 150 : 0;
  const total = subtotal + shippingCost;

  const removeItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ShoppingCart size={64} className="mx-auto text-slate-300 dark:text-slate-700 mb-6" />
        <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">Tu carrito está vacío</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Parece que aún no has agregado productos a tu carrito.</p>
        <button 
          onClick={() => onNavigate('catalog')}
          className="px-8 py-3 rounded-xl font-bold bg-[#FFD700] dark:bg-[#00E5FF] text-slate-900 hover:bg-[#FFD700]/90 dark:hover:bg-[#00E5FF]/90 transition-all shadow-lg shadow-[#FFD700]/20 dark:shadow-[#00E5FF]/20"
        >
          Explorar Catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      <button 
        onClick={() => onNavigate('catalog')}
        className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={16} /> Seguir Comprando
      </button>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">
          Finalizar Compra
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Left: Cart Items */}
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-6">Resumen del Pedido</h2>
          
          <div className="bg-white dark:bg-[#0D1B3E] rounded-3xl p-6 shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-800/50 space-y-6">
            {cartItems.map((item, index) => (
              <div key={index} className="flex gap-4 pb-6 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                  <img src={item.product.image || item.product.img} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-slate-900 dark:text-white">{item.product.name}</h3>
                      <button 
                        onClick={() => removeItem(index)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.customization}</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 rounded-lg px-3 py-1 border border-slate-200 dark:border-slate-800">
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Cant:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{item.quantity}</span>
                    </div>
                    <span className="font-bold text-lg text-slate-900 dark:text-white">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Checkout Form */}
        <div className="w-full lg:w-[450px] shrink-0 space-y-8">
          
          {/* Shipping */}
          <div className="bg-white dark:bg-[#0D1B3E] rounded-3xl p-6 shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-800/50">
            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Truck size={20} className="text-[#FFD700] dark:text-[#00E5FF]" />
              Método de Entrega
            </h3>
            
            <div className="space-y-3">
              <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${shippingMethod === 'delivery' ? 'border-[#FFD700] dark:border-[#00E5FF] bg-[#FFD700]/5 dark:bg-[#00E5FF]/5' : 'border-slate-200 dark:border-slate-800'}`}>
                <input type="radio" name="shipping" value="delivery" checked={shippingMethod === 'delivery'} onChange={() => setShippingMethod('delivery')} className="mt-1" />
                <div>
                  <span className="block font-bold text-slate-900 dark:text-white">Envío a Domicilio</span>
                  <span className="block text-sm text-slate-500 dark:text-slate-400">2-3 días hábiles ($150.00)</span>
                </div>
              </label>
              <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${shippingMethod === 'pickup' ? 'border-[#FFD700] dark:border-[#00E5FF] bg-[#FFD700]/5 dark:bg-[#00E5FF]/5' : 'border-slate-200 dark:border-slate-800'}`}>
                <input type="radio" name="shipping" value="pickup" checked={shippingMethod === 'pickup'} onChange={() => setShippingMethod('pickup')} className="mt-1" />
                <div>
                  <span className="block font-bold text-slate-900 dark:text-white">Recoger en Sucursal</span>
                  <span className="block text-sm text-slate-500 dark:text-slate-400">Gratis - Centro, CDMX</span>
                </div>
              </label>
            </div>

            {shippingMethod === 'delivery' && (
              <div className="mt-6 space-y-4">
                <input type="text" placeholder="Calle y Número" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FFD700] dark:focus:ring-[#00E5FF] focus:border-transparent transition-all" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Colonia" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FFD700] dark:focus:ring-[#00E5FF] focus:border-transparent transition-all" />
                  <input type="text" placeholder="C.P." className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FFD700] dark:focus:ring-[#00E5FF] focus:border-transparent transition-all" />
                </div>
              </div>
            )}
          </div>

          {/* Payment */}
          <div className="bg-white dark:bg-[#0D1B3E] rounded-3xl p-6 shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-800/50">
            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <CreditCard size={20} className="text-[#FFD700] dark:text-[#00E5FF]" />
              Método de Pago
            </h3>
            
            <div className="space-y-3">
              <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#FFD700] dark:border-[#00E5FF] bg-[#FFD700]/5 dark:bg-[#00E5FF]/5' : 'border-slate-200 dark:border-slate-800'}`}>
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                <span className="font-bold text-slate-900 dark:text-white">Tarjeta de Crédito / Débito</span>
              </label>
              <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'border-[#FFD700] dark:border-[#00E5FF] bg-[#FFD700]/5 dark:bg-[#00E5FF]/5' : 'border-slate-200 dark:border-slate-800'}`}>
                <input type="radio" name="payment" value="transfer" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} />
                <span className="font-bold text-slate-900 dark:text-white">Transferencia SPEI</span>
              </label>
            </div>

            {paymentMethod === 'card' && (
              <div className="mt-6 space-y-4">
                <input type="text" placeholder="Número de Tarjeta" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FFD700] dark:focus:ring-[#00E5FF] focus:border-transparent transition-all" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM/AA" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FFD700] dark:focus:ring-[#00E5FF] focus:border-transparent transition-all" />
                  <input type="text" placeholder="CVC" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FFD700] dark:focus:ring-[#00E5FF] focus:border-transparent transition-all" />
                </div>
              </div>
            )}
          </div>

          {/* Totals */}
          <div className="bg-white dark:bg-[#0D1B3E] rounded-3xl p-6 shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-800/50">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Envío</span>
                <span>{shippingCost === 0 ? 'Gratis' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-slate-900 dark:text-white pt-4 border-t border-slate-100 dark:border-slate-800">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-slate-900 bg-[#FFD700] dark:bg-[#00E5FF] hover:bg-[#FFD700]/90 dark:hover:bg-[#00E5FF]/90 transition-all shadow-lg shadow-[#FFD700]/20 dark:shadow-[#00E5FF]/20">
              <Lock size={18} />
              Pagar Seguro
            </button>
            <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
              <Lock size={12} /> Pagos encriptados y seguros
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
