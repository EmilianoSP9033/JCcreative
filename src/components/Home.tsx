import React from 'react';
import { 
  ArrowRight, Palette, Layers, Zap, Truck, ShieldCheck, 
  Clock, Star, Quote, Instagram, Facebook, Twitter, Mail
} from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../types';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
}

const categories = [
  { name: 'Camisas', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800' },
  { name: 'Gorras', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800' },
  { name: 'Tazas', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=800' },
  { name: 'Lonas', image: 'https://images.unsplash.com/photo-1562613531-a2fa2b8006e2?auto=format&fit=crop&q=80&w=800' },
  { name: 'Sudaderas', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800' },
  { name: 'Calcomanías', image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&q=80&w=800' },
];

const features = [
  { icon: <Zap size={32} className="text-blue-500" />, title: 'Calidad Premium', desc: 'Impresión de alta resolución y materiales duraderos que resisten el paso del tiempo.' },
  { icon: <Truck size={32} className="text-blue-500" />, title: 'Envío Rápido', desc: 'Entregas a todo el país en tiempo récord para que no detengas tus proyectos.' },
  { icon: <ShieldCheck size={32} className="text-blue-500" />, title: 'Pago Seguro', desc: 'Transacciones 100% protegidas y encriptadas para tu total tranquilidad.' },
  { icon: <Clock size={32} className="text-blue-500" />, title: 'Sin Mínimos', desc: 'Pide desde 1 pieza hasta miles sin problema. Nos adaptamos a tu volumen.' },
];

const steps = [
  { number: '01', title: 'Elige un Producto', desc: 'Explora nuestro catálogo y selecciona la prenda o artículo ideal para tu proyecto.' },
  { number: '02', title: 'Diseña a tu Gusto', desc: 'Usa nuestro editor online para agregar textos, imágenes, formas y plantillas.' },
  { number: '03', title: 'Haz tu Pedido', desc: 'Confirma tu diseño, selecciona la cantidad, tallas y realiza el pago seguro.' },
  { number: '04', title: 'Recibe en Casa', desc: 'Nosotros lo imprimimos con la mejor calidad y lo enviamos directamente a tu puerta.' },
];

const testimonials = [
  { name: 'Carlos Mendoza', role: 'Emprendedor', text: 'Excelente calidad en las playeras para mi startup. El editor es súper fácil de usar y el envío fue rapidísimo.', rating: 5 },
  { name: 'Ana Sofía', role: 'Diseñadora', text: 'Me encanta poder subir mis propios diseños y ver cómo quedan en los mockups antes de comprar. 100% recomendados.', rating: 5 },
  { name: 'Roberto Gómez', role: 'Organizador de Eventos', text: 'Pedimos 500 lonas y gorras para un festival. Todo llegó a tiempo y con una impresión impecable.', rating: 5 },
];

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 dark:from-slate-900 dark:via-slate-900/60 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
          >
            <Zap size={16} />
            <span>Impresión de alta calidad sin mínimos</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white"
          >
            Imprime tus ideas <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              con calidad premium
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto"
          >
            Personaliza ropa, accesorios y material publicitario con nuestro estudio de diseño intuitivo. Resultados profesionales garantizados.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => onNavigate('catalog')}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2"
            >
              <Palette size={20} /> Empezar a Diseñar
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features / Trust Bar */}
      <section className="bg-slate-100 dark:bg-slate-800/50 border-y border-slate-200 dark:border-slate-800 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-colors"
              >
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Explora nuestras categorías</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Encuentra el producto perfecto para tu marca, evento o uso personal.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div 
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-colors cursor-pointer shadow-sm hover:shadow-md"
              onClick={() => onNavigate('catalog')}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-6 flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{cat.name}</h3>
                  <p className="text-slate-300 text-sm">Personalizable</p>
                </div>
                <button 
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-slate-100 dark:bg-slate-800/30 py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">¿Cómo funciona JC creative?</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Crear tus productos personalizados es más fácil que nunca. Sigue estos simples pasos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-slate-200 dark:bg-slate-700 -z-10" />

            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-800 border-4 border-slate-50 dark:border-slate-900 flex items-center justify-center mb-6 shadow-xl">
                  <span className="text-3xl font-black text-blue-500">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Lo que dicen nuestros clientes</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Miles de creadores, empresas y personas confían en nuestra calidad.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 relative shadow-sm"
            >
              <Quote className="absolute top-6 right-6 text-slate-100 dark:text-slate-700" size={40} />
              <div className="flex items-center gap-1 text-yellow-500 mb-6">
                {[...Array(test.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic mb-8 relative z-10">"{test.text}"</p>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">{test.name}</h4>
                <p className="text-sm text-blue-500 dark:text-blue-400">{test.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-12 text-center relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">¿Listo para crear algo increíble?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              Únete a miles de clientes satisfechos. Diseña tu primer producto hoy y obtén un 10% de descuento en tu primer pedido.
            </p>
            <button 
              onClick={() => onNavigate('catalog')}
              className="px-10 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-slate-100 transition-colors shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Ir al Catálogo
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-slate-950 pt-20 pb-10 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">
                  JC
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">JC creative</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Tu socio confiable para impresión personalizada. Calidad premium, envíos rápidos y el mejor editor online del mercado.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-colors shadow-sm">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-colors shadow-sm">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-colors shadow-sm">
                  <Twitter size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-6">Productos</h4>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Camisas y Playeras</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Gorras Personalizadas</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tazas y Termos</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Lonas y Banners</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Calcomanías y Stickers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-6">Soporte</h4>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Centro de Ayuda</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Rastrear Pedido</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Políticas de Envío</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Devoluciones</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Guía de Tallas</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-6">Contacto</h4>
              <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-blue-500 shrink-0 mt-0.5" />
                  <span>hola@jccreative.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Truck size={18} className="text-blue-500 shrink-0 mt-0.5" />
                  <span>Envíos a todo México y Latinoamérica</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">© 2024 JC creative. Todos los derechos reservados.</p>
            <div className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Términos</a>
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
