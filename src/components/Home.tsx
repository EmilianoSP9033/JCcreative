import React, { useEffect, useRef } from 'react';
import { 
  PenTool, MapPin, Phone, Clock, Instagram, Facebook, Twitter, 
  ChevronRight, Palette, Printer, Package, CreditCard, Shirt, 
  FileText, Stamp, Coffee, Sticker, Flag, ArrowRight, MessageCircle
} from 'lucide-react';

const PRODUCTS = [
  { id: 'card', name: 'Tarjetas de Presentación', price: '199', icon: <CreditCard size={32} /> },
  { id: 'banner', name: 'Lonas', price: '299', icon: <Flag size={32} /> },
  { id: 'tshirt', name: 'Playeras', price: '189', icon: <Shirt size={32} /> },
  { id: 'flyer', name: 'Flyers', price: '59', icon: <FileText size={32} /> },
  { id: 'stamp', name: 'Sellos', price: '150', icon: <Stamp size={32} /> },
  { id: 'mug', name: 'Tazas', price: '129', icon: <Coffee size={32} /> },
  { id: 'sticker', name: 'Stickers', price: '49', icon: <Sticker size={32} /> },
  { id: 'poster', name: 'Banners', price: '399', icon: <Flag size={32} /> },
];

const GALLERY = [
  { id: 1, src: 'https://picsum.photos/seed/print1/400/500', alt: 'Lona publicitaria', rotate: '-rotate-2' },
  { id: 2, src: 'https://picsum.photos/seed/print2/400/400', alt: 'Tarjetas de presentación', rotate: 'rotate-3' },
  { id: 3, src: 'https://picsum.photos/seed/print3/400/600', alt: 'Playera estampada', rotate: '-rotate-1' },
  { id: 4, src: 'https://picsum.photos/seed/print4/400/450', alt: 'Taza personalizada', rotate: 'rotate-2' },
  { id: 5, src: 'https://picsum.photos/seed/print5/400/550', alt: 'Stickers troquelados', rotate: '-rotate-3' },
];

// Ink Splash SVG Component
const InkSplash = ({ className, color, style }: { className?: string, color: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className} style={{ fill: color, opacity: 0.15, ...style }}>
    <path d="M45.7,-76.1C58.9,-69.3,69.2,-55.4,76.5,-40.8C83.8,-26.2,88.1,-10.9,86.2,3.8C84.3,18.5,76.2,32.6,66.1,44.2C56,55.8,43.9,64.9,30.4,71.1C16.9,77.3,2,80.6,-12.1,79.5C-26.2,78.4,-39.5,72.9,-51.1,64.2C-62.7,55.5,-72.6,43.6,-78.9,29.8C-85.2,16,-87.9,0.3,-84.8,-14.2C-81.7,-28.7,-72.8,-42,-61.2,-51.6C-49.6,-61.2,-35.3,-67.1,-21.3,-71.4C-7.3,-75.7,6.4,-78.4,20.8,-79.1C35.2,-79.8,50.3,-78.5,45.7,-76.1Z" transform="translate(100 100)" />
  </svg>
);

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-[#070B18] text-white font-sans overflow-x-hidden">
      {/* 1. NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#070B18]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="relative">
              <PenTool className="text-[#00E5FF] w-8 h-8 relative z-10" />
              <div className="absolute inset-0 bg-[#00E5FF] blur-lg opacity-50 rounded-full"></div>
            </div>
            <span className="font-bold text-2xl tracking-tight">JC <span className="text-[#00E5FF]">Creative</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-300">
            <button onClick={() => onNavigate('home')} className="hover:text-[#00E5FF] transition-colors">Inicio</button>
            <button onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#00E5FF] transition-colors">Productos</button>
            <button onClick={() => onNavigate('editor')} className="hover:text-[#00E5FF] transition-colors">Editor</button>
            <button onClick={() => document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#00E5FF] transition-colors">Galería</button>
            <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#00E5FF] transition-colors">Contacto</button>
          </div>

          <button className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 border border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#070B18] shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)]">
            Cotizar ahora
          </button>
        </div>
      </nav>

      <main className="pt-28 pb-20">
        {/* 2. HERO SECTION — Bento Grid Style */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative">
          <InkSplash color="#FFD700" className="absolute -top-20 -left-20 w-96 h-96 animate-pulse-slow" />
          <InkSplash color="#00E5FF" className="absolute top-40 -right-20 w-[500px] h-[500px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
            {/* Left Large Card */}
            <div className="lg:col-span-8 bg-[#0D1B3E]/80 backdrop-blur-sm border border-[#00E5FF]/20 rounded-3xl p-10 lg:p-16 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0A3D8F] blur-[100px] rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-700"></div>
              
              <div className="inline-flex items-center gap-2 bg-[#070B18]/80 border border-white/10 rounded-full px-4 py-2 w-max mb-8">
                <MapPin size={16} className="text-[#FFD700]" />
                <span className="text-sm font-medium text-gray-300">Gral. Bravo, N.L.</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight">
                Tu idea, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#0A3D8F]">impresa con impacto</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-400 max-w-xl mb-10 leading-relaxed">
                Transformamos tu creatividad en productos físicos de alta calidad. Desde tarjetas de presentación hasta lonas gigantes, con colores vibrantes y acabados premium.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <button onClick={() => onNavigate('editor')} className="px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 bg-[#00E5FF] text-[#070B18] shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] hover:scale-105 flex items-center gap-2">
                  <Palette size={20} />
                  Abrir Editor
                </button>
                <button className="px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 border border-white/20 hover:bg-white/5 flex items-center gap-2">
                  Ver Catálogo <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Right Stacked Cards */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-gradient-to-br from-[#6A1B9A]/20 to-[#0D1B3E] border border-[#6A1B9A]/30 rounded-3xl p-8 flex-1 flex flex-col justify-between group hover:border-[#6A1B9A]/60 transition-colors relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
                  <CreditCard size={120} />
                </div>
                <h3 className="text-2xl font-bold mb-2 relative z-10">Tarjetas</h3>
                <p className="text-gray-400 relative z-10">Premium & Estándar</p>
                <div className="mt-8 relative z-10">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-[#6A1B9A]/30 text-[#E1BEE7] text-sm font-semibold">Más vendidas</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#0A3D8F]/20 to-[#0D1B3E] border border-[#0A3D8F]/30 rounded-3xl p-8 flex-1 flex flex-col justify-between group hover:border-[#0A3D8F]/60 transition-colors relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
                  <Flag size={120} />
                </div>
                <h3 className="text-2xl font-bold mb-2 relative z-10">Lonas</h3>
                <p className="text-gray-400 relative z-10">Gran formato y alta resolución</p>
              </div>
              
              <div className="bg-gradient-to-br from-[#FFD700]/10 to-[#0D1B3E] border border-[#FFD700]/20 rounded-3xl p-8 flex-1 flex flex-col justify-between group hover:border-[#FFD700]/40 transition-colors relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500 text-[#FFD700]">
                  <Shirt size={120} />
                </div>
                <h3 className="text-2xl font-bold mb-2 relative z-10">Playeras</h3>
                <p className="text-gray-400 relative z-10">Estampados duraderos</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PRODUCTS SECTION */}
        <section id="productos" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">¿Qué necesitas <span className="text-[#00E5FF]">imprimir?</span></h2>
              <p className="text-gray-400 text-lg">Explora nuestro catálogo y personaliza tus productos en línea.</p>
            </div>
            <div className="hidden md:flex gap-2">
              <button onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })} className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
                <ChevronRight size={24} className="rotate-180" />
              </button>
              <button onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })} className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="pl-4 sm:pl-6 lg:pl-8">
            <div 
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-12 pt-4 pr-8 hide-scrollbar snap-x snap-mandatory"
            >
              {PRODUCTS.map((product) => (
                <div 
                  key={product.id}
                  className="snap-start shrink-0 w-[280px] bg-[#0D1B3E] border border-[#00E5FF]/30 rounded-3xl p-8 flex flex-col group hover:border-[#00E5FF] hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/5 rounded-bl-full -z-10 group-hover:bg-[#00E5FF]/10 transition-colors"></div>
                  
                  <div className="w-16 h-16 rounded-2xl bg-[#070B18] border border-white/5 flex items-center justify-center text-[#00E5FF] mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {product.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-8">desde <span className="text-[#FFD700] font-bold text-lg">${product.price}</span></p>
                  
                  <button onClick={() => onNavigate('editor')} className="mt-auto w-full py-3 rounded-xl border border-[#00E5FF]/50 text-[#00E5FF] font-semibold group-hover:bg-[#00E5FF] group-hover:text-[#070B18] transition-colors flex items-center justify-center gap-2">
                    <Palette size={18} />
                    Diseñar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. HOW IT WORKS */}
        <section className="py-24 bg-[#0A1128] relative border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">¿Cómo funciona?</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">Un proceso simple y rápido para tener tus impresiones listas.</p>
            </div>

            <div className="relative">
              {/* Animated dashed line (desktop only) */}
              <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-white/20 -translate-y-1/2 z-0"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {/* Step 1 */}
                <div className="bg-[#070B18] border border-white/10 rounded-3xl p-8 text-center relative group hover:border-[#FFD700]/50 transition-colors">
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#F57F17] flex items-center justify-center font-bold text-[#070B18] shadow-[0_0_15px_rgba(255,215,0,0.4)]">1</div>
                  <div className="w-20 h-20 mx-auto bg-[#FFD700]/10 rounded-full flex items-center justify-center text-[#FFD700] mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Package size={36} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Elige tu producto</h3>
                  <p className="text-gray-400 text-sm">Selecciona el formato, tamaño y material que necesitas para tu proyecto.</p>
                </div>

                {/* Step 2 */}
                <div className="bg-[#070B18] border border-white/10 rounded-3xl p-8 text-center relative group hover:border-[#00E5FF]/50 transition-colors">
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#00B8D4] flex items-center justify-center font-bold text-[#070B18] shadow-[0_0_15px_rgba(0,229,255,0.4)]">2</div>
                  <div className="w-20 h-20 mx-auto bg-[#00E5FF]/10 rounded-full flex items-center justify-center text-[#00E5FF] mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Palette size={36} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Personaliza el diseño</h3>
                  <p className="text-gray-400 text-sm">Usa nuestro editor online para agregar texto, imágenes y formas a tu gusto.</p>
                </div>

                {/* Step 3 */}
                <div className="bg-[#070B18] border border-white/10 rounded-3xl p-8 text-center relative group hover:border-[#6A1B9A]/50 transition-colors">
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-[#6A1B9A] to-[#8E24AA] flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(106,27,154,0.4)]">3</div>
                  <div className="w-20 h-20 mx-auto bg-[#6A1B9A]/10 rounded-full flex items-center justify-center text-[#E1BEE7] mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Printer size={36} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Recibe tu pedido</h3>
                  <p className="text-gray-400 text-sm">Enviamos tu diseño a producción y te notificamos cuando esté listo para recoger.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. GALLERY STRIP */}
        <section id="galeria" className="py-24 bg-[#0B132B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Nuestros <span className="text-[#FFD700]">trabajos</span></h2>
                <p className="text-gray-400 text-lg max-w-xl">Un vistazo a la calidad y detalle de las impresiones que entregamos a nuestros clientes.</p>
              </div>
              <button className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/5 font-semibold transition-colors w-max">
                Ver galería completa
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {GALLERY.map((item, i) => (
                <div 
                  key={item.id} 
                  className={`bg-white p-3 rounded-sm shadow-2xl transform transition-transform duration-500 hover:scale-105 hover:z-10 ${item.rotate} ${i % 2 === 0 ? 'mt-0 lg:mt-8' : 'mt-8 lg:mt-0'}`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 mb-3">
                    <img src={item.src} alt={item.alt} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <p className="text-[#070B18] font-medium text-center text-sm font-serif italic">{item.alt}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. LOCATION + CONTACT */}
        <section id="contacto" className="py-24 relative overflow-hidden">
          {/* Yellow accent strip */}
          <div className="absolute top-0 left-0 w-2 h-full bg-[#FFD700]"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Map Card */}
              <div className="bg-[#0D1B3E] border border-white/10 p-2 rounded-3xl shadow-2xl relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00E5FF] to-[#0A3D8F] rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gray-800">
                  {/* Placeholder for actual Google Maps iframe */}
                  <div className="absolute inset-0 bg-[#0A1128] flex flex-col items-center justify-center text-center p-6">
                    <MapPin size={48} className="text-[#00E5FF] mb-4" />
                    <h3 className="text-xl font-bold mb-2">JC Creative</h3>
                    <p className="text-gray-400 text-sm">Av. Bernardo Reyes 357-S<br/>Gral. Bravo, N.L. 67000</p>
                    <button className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors">
                      Abrir en Google Maps
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-10 pl-0 lg:pl-10">
                <div>
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Visítanos o <br/><span className="text-[#00E5FF]">contáctanos</span></h2>
                  <p className="text-gray-400 text-lg">Estamos listos para ayudarte con tu próximo proyecto de impresión.</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#0D1B3E] border border-white/10 flex items-center justify-center shrink-0 text-[#FFD700]">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Ubicación</h4>
                      <p className="text-gray-400">Av. Bernardo Reyes 357-S<br/>Gral. Bravo, N.L. 67000</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#0D1B3E] border border-white/10 flex items-center justify-center shrink-0 text-[#00E5FF]">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Horario de atención</h4>
                      <p className="text-gray-400">Lunes a Viernes: 9:00 AM - 6:00 PM<br/>Sábados: 9:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>

                <button className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 bg-[#25D366] text-white shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] hover:-translate-y-1 flex items-center justify-center gap-3">
                  <MessageCircle size={24} />
                  Enviar WhatsApp
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. FOOTER */}
      <footer className="bg-[#070B18] border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#00E5FF]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <PenTool className="text-[#00E5FF] w-6 h-6 relative z-10" />
                </div>
                <span className="font-bold text-xl tracking-tight">JC <span className="text-[#00E5FF]">Creative</span></span>
              </div>
              <p className="text-gray-400 max-w-sm mb-8">
                Imprimiendo creatividad desde Gral. Bravo. Calidad, rapidez y atención personalizada en cada proyecto.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00E5FF] hover:text-[#070B18] transition-all duration-300">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00E5FF] hover:text-[#070B18] transition-all duration-300">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00E5FF] hover:text-[#070B18] transition-all duration-300">
                  <Twitter size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Enlaces Rápidos</h4>
              <ul className="space-y-3 text-gray-400">
                <li><button onClick={() => onNavigate('home')} className="hover:text-[#00E5FF] transition-colors">Inicio</button></li>
                <li><button onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#00E5FF] transition-colors">Productos</button></li>
                <li><button onClick={() => onNavigate('editor')} className="hover:text-[#00E5FF] transition-colors">Editor Online</button></li>
                <li><button onClick={() => document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#00E5FF] transition-colors">Galería</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Legal</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-[#00E5FF] transition-colors">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-[#00E5FF] transition-colors">Aviso de Privacidad</a></li>
                <li><a href="#" className="hover:text-[#00E5FF] transition-colors">Políticas de Envío</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} JC Creative. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
