import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Palette, User, CheckCircle2, ChevronRight, Upload, MessageCircle, ShoppingCart } from 'lucide-react';
import { Screen, Product } from '../types';

interface QuoteProps {
  onNavigate: (screen: Screen) => void;
  initialProduct?: Product;
}

const STEPS = [
  { id: 'product', title: 'Producto', icon: Package },
  { id: 'design', title: 'Diseño', icon: Palette },
  { id: 'details', title: 'Datos', icon: User },
];

const PRODUCTS = [
  'Tarjetas de Presentación', 'Lonas Publicitarias', 'Playeras Personalizadas', 
  'Flyers Promocionales', 'Sellos de Goma', 'Tazas Sublimadas', 
  'Stickers Troquelados', 'Banners Roll-up', 'Calendarios', 'Otro'
];

export default function Quote({ onNavigate, initialProduct }: QuoteProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    product: initialProduct?.name || '',
    quantity: '100',
    material: '',
    designOption: 'upload', // 'upload' | 'request'
    designNotes: '',
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">
          Cotiza tu Proyecto
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Cuéntanos qué necesitas y te daremos el mejor precio. Nuestro equipo te contactará en breve.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Main Form Area */}
        <div className="flex-1">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full z-0"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#FFD700] dark:bg-[#00E5FF] rounded-full z-0 transition-all duration-500"
              style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
            ></div>
            
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                      isActive 
                        ? 'bg-white dark:bg-[#0D1B3E] border-[#FFD700] dark:border-[#00E5FF] text-[#FFD700] dark:text-[#00E5FF] shadow-[0_0_15px_rgba(255,215,0,0.3)] dark:shadow-[0_0_15px_rgba(0,229,255,0.3)]' 
                        : isCompleted
                          ? 'bg-[#FFD700] dark:bg-[#00E5FF] border-[#FFD700] dark:border-[#00E5FF] text-white dark:text-[#070B18]'
                          : 'bg-white dark:bg-[#070B18] border-slate-200 dark:border-slate-800 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 size={24} /> : <Icon size={24} />}
                  </div>
                  <span className={`mt-2 text-sm font-bold ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Form Content */}
          <div className="bg-white dark:bg-[#0D1B3E] rounded-3xl p-6 md:p-10 shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-800/50 min-h-[400px]">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-6">Detalles del Producto</h2>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">¿Qué producto necesitas?</label>
                    <select 
                      value={formData.product}
                      onChange={(e) => updateForm('product', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FFD700] dark:focus:ring-[#00E5FF] focus:border-transparent transition-all"
                    >
                      <option value="">Selecciona un producto...</option>
                      {PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Cantidad</label>
                      <input 
                        type="number" 
                        value={formData.quantity}
                        onChange={(e) => updateForm('quantity', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FFD700] dark:focus:ring-[#00E5FF] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Material / Acabado (Opcional)</label>
                      <input 
                        type="text" 
                        placeholder="Ej. Papel couché, mate, etc."
                        value={formData.material}
                        onChange={(e) => updateForm('material', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FFD700] dark:focus:ring-[#00E5FF] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-6">Tu Diseño</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => updateForm('designOption', 'upload')}
                      className={`p-6 rounded-2xl border-2 text-left transition-all ${
                        formData.designOption === 'upload'
                          ? 'border-[#FFD700] dark:border-[#00E5FF] bg-[#FFD700]/10 dark:bg-[#00E5FF]/10'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <Upload className={`mb-4 ${formData.designOption === 'upload' ? 'text-[#FFD700] dark:text-[#00E5FF]' : 'text-slate-400'}`} size={32} />
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Ya tengo mi diseño</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Subiré mis archivos listos para imprimir.</p>
                    </button>

                    <button
                      onClick={() => updateForm('designOption', 'request')}
                      className={`p-6 rounded-2xl border-2 text-left transition-all ${
                        formData.designOption === 'request'
                          ? 'border-[#FFD700] dark:border-[#00E5FF] bg-[#FFD700]/10 dark:bg-[#00E5FF]/10'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <Palette className={`mb-4 ${formData.designOption === 'request' ? 'text-[#FFD700] dark:text-[#00E5FF]' : 'text-slate-400'}`} size={32} />
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Necesito diseño</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Quiero que su equipo creativo lo diseñe por mí.</p>
                    </button>
                  </div>

                  {formData.designOption === 'upload' && (
                    <div className="mt-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                      <Upload className="mx-auto text-slate-400 mb-4" size={32} />
                      <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">Haz clic para subir tus archivos</p>
                      <p className="text-sm text-slate-500">PDF, AI, PSD, PNG o JPG (Max 50MB)</p>
                    </div>
                  )}

                  <div className="mt-6">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Notas adicionales sobre el diseño</label>
                    <textarea 
                      rows={4}
                      value={formData.designNotes}
                      onChange={(e) => updateForm('designNotes', e.target.value)}
                      placeholder="Describe colores, estilos, o cualquier detalle importante..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FFD700] dark:focus:ring-[#00E5FF] focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-6">Tus Datos</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nombre completo *</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => updateForm('name', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FFD700] dark:focus:ring-[#00E5FF] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Empresa (Opcional)</label>
                      <input 
                        type="text" 
                        value={formData.company}
                        onChange={(e) => updateForm('company', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FFD700] dark:focus:ring-[#00E5FF] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Correo electrónico *</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FFD700] dark:focus:ring-[#00E5FF] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Teléfono / WhatsApp *</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => updateForm('phone', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FFD700] dark:focus:ring-[#00E5FF] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between">
              <button
                onClick={handlePrev}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${
                  currentStep === 0 
                    ? 'opacity-0 pointer-events-none' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Anterior
              </button>
              
              {currentStep < STEPS.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-lg shadow-slate-900/20 dark:shadow-white/10"
                >
                  Siguiente <ChevronRight size={20} />
                </button>
              ) : (
                <div className="hidden"></div> // Placeholder to keep layout
              )}
            </div>
          </div>
        </div>

        {/* Sticky Summary Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="sticky top-28 bg-white dark:bg-[#0D1B3E] rounded-3xl p-6 shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-800/50">
            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6">Resumen de Cotización</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 text-sm">Producto</span>
                <span className="font-bold text-slate-900 dark:text-white text-right max-w-[150px]">{formData.product || '-'}</span>
              </div>
              <div className="flex justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 text-sm">Cantidad</span>
                <span className="font-bold text-slate-900 dark:text-white">{formData.quantity || '-'}</span>
              </div>
              <div className="flex justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 text-sm">Diseño</span>
                <span className="font-bold text-slate-900 dark:text-white text-right">
                  {formData.designOption === 'upload' ? 'Tengo diseño' : 'Necesito diseño'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] transition-colors shadow-lg shadow-[#25D366]/20">
                <MessageCircle size={20} />
                Enviar por WhatsApp
              </button>
              
              <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-slate-900 bg-[#FFD700] dark:bg-[#00E5FF] hover:bg-[#FFD700]/90 dark:hover:bg-[#00E5FF]/90 transition-all shadow-lg shadow-[#FFD700]/20 dark:shadow-[#00E5FF]/20">
                <ShoppingCart size={20} />
                Añadir al Carrito
              </button>
            </div>
            
            <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-6">
              Al enviar, un asesor revisará tu solicitud y te contactará con el precio final.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
