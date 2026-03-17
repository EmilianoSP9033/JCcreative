import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Type, Image as ImageIcon, Square, LayoutTemplate, Palette, 
  Undo, Redo, ZoomIn, ZoomOut, Trash2, ShoppingCart, Download
} from 'lucide-react';
import { DndContext, useDraggable, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { Screen, Product, CanvasElement } from '../types';

interface EditorProps {
  onNavigate: (screen: Screen, product?: Product) => void;
  product?: Product | null;
}

interface DraggableItemProps {
  element: CanvasElement;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ element, isSelected, onSelect }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
  });

  const style: React.CSSProperties = {
    position: 'absolute',
    left: element.x,
    top: element.y,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    color: element.color,
    fontSize: element.fontSize ? `${element.fontSize}px` : undefined,
    width: element.width,
    height: element.height,
    border: isSelected ? '2px dashed #3b82f6' : 'none',
    cursor: 'move',
    padding: '4px',
    backgroundColor: element.type === 'shape' ? element.color : 'transparent',
    zIndex: isSelected ? 10 : (element.zIndex || 1),
    borderRadius: element.type === 'shape' && element.width === element.height && element.content === 'circle' ? '50%' : undefined,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
      onClick={(e) => { e.stopPropagation(); onSelect(element.id); }}
    >
      {element.type === 'text' && element.content}
      {element.type === 'image' && <img src={element.content} alt="canvas item" className="w-full h-full object-contain pointer-events-none" />}
    </div>
  );
}

export default function Editor({ onNavigate, product }: EditorProps) {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [activeTab, setActiveTab] = useState('text');
  
  // Product options
  const [size, setSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, delta } = event;
    setElements(els => els.map(el => {
      if (el.id === active.id) {
        return { ...el, x: el.x + delta.x, y: el.y + delta.y };
      }
      return el;
    }));
  };

  const addElement = (type: 'text' | 'image' | 'shape', content: string) => {
    const newEl: CanvasElement = {
      id: `el-${Date.now()}`,
      type,
      content,
      x: 100,
      y: 100,
      color: type === 'shape' ? '#3b82f6' : '#ffffff',
      fontSize: type === 'text' ? 24 : undefined,
      width: type === 'shape' ? 100 : (type === 'image' ? 150 : undefined),
      height: type === 'shape' ? 100 : (type === 'image' ? 150 : undefined),
    };
    setElements([...elements, newEl]);
    setSelectedId(newEl.id);
  };

  const deleteSelected = () => {
    if (selectedId) {
      setElements(els => els.filter(el => el.id !== selectedId));
      setSelectedId(null);
    }
  };

  const updateSelected = (updates: Partial<CanvasElement>) => {
    if (selectedId) {
      setElements(els => els.map(el => el.id === selectedId ? { ...el, ...updates } : el));
    }
  };

  const selectedElement = elements.find(el => el.id === selectedId);
  const basePrice = product?.price || 0;
  const totalPrice = basePrice * quantity;

  // Tools Sidebar Items
  const tools = [
    { id: 'text', icon: <Type size={20} />, label: 'Texto' },
    { id: 'image', icon: <ImageIcon size={20} />, label: 'Imágenes' },
    { id: 'shape', icon: <Square size={20} />, label: 'Formas' },
    { id: 'template', icon: <LayoutTemplate size={20} />, label: 'Plantillas' },
    { id: 'bg', icon: <Palette size={20} />, label: 'Fondos' },
  ];

  return (
    <div className="h-[calc(100vh-64px)] flex overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-20 md:w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col shrink-0 transition-colors duration-300 z-20 shadow-lg"
      >
        <div className="flex flex-1">
          {/* Tool Icons */}
          <div className="w-20 border-r border-slate-200 dark:border-slate-700 flex flex-col items-center py-4 gap-4">
            {tools.map((t, i) => (
              <motion.button 
                key={t.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveTab(t.id)}
                className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-colors ${activeTab === t.id ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'}`}
              >
                {t.icon}
                <span className="text-[10px] mt-1 font-medium">{t.label}</span>
              </motion.button>
            ))}
          </div>
          
          {/* Tool Content (Hidden on mobile) */}
          <div className="hidden md:block flex-1 p-4 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
                  {tools.find(t => t.id === activeTab)?.label}
                </h3>
                
                {activeTab === 'text' && (
                  <div className="space-y-3">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => addElement('text', 'Añadir Título')} className="w-full p-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-2xl font-bold text-left text-slate-900 dark:text-white transition-colors">Añadir Título</motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => addElement('text', 'Añadir Subtítulo')} className="w-full p-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-lg font-semibold text-left text-slate-900 dark:text-white transition-colors">Añadir Subtítulo</motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => addElement('text', 'Añadir texto de párrafo')} className="w-full p-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-sm text-left text-slate-900 dark:text-white transition-colors">Añadir texto de párrafo</motion.button>
                  </div>
                )}
                
                {activeTab === 'image' && (
                  <div className="space-y-4">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-colors shadow-md">Subir Imagen</motion.button>
                    <div className="grid grid-cols-2 gap-2">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => addElement('image', 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=150&q=80')} className="aspect-square bg-slate-100 dark:bg-slate-700 rounded-lg cursor-pointer hover:ring-2 ring-blue-500 overflow-hidden"><img src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" /></motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => addElement('image', 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=150&q=80')} className="aspect-square bg-slate-100 dark:bg-slate-700 rounded-lg cursor-pointer hover:ring-2 ring-blue-500 overflow-hidden"><img src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" /></motion.div>
                    </div>
                  </div>
                )}

                {activeTab === 'shape' && (
                  <div className="grid grid-cols-2 gap-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => addElement('shape', 'square')} className="aspect-square bg-slate-100 dark:bg-slate-700 rounded-lg cursor-pointer hover:ring-2 ring-blue-500 flex items-center justify-center transition-all"><div className="w-12 h-12 bg-slate-900 dark:bg-white"></div></motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => addElement('shape', 'circle')} className="aspect-square bg-slate-100 dark:bg-slate-700 rounded-lg cursor-pointer hover:ring-2 ring-blue-500 flex items-center justify-center transition-all"><div className="w-12 h-12 bg-slate-900 dark:bg-white rounded-full"></div></motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Center Column: Canvas */}
      <div className="flex-1 flex flex-col bg-slate-100 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300" onClick={() => setSelectedId(null)}>
        {/* Top Toolbar */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="h-12 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 shrink-0 transition-colors duration-300 z-10 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"><Undo size={18} /></button>
            <button className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"><Redo size={18} /></button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"><ZoomOut size={18} /></button>
            <span className="text-sm font-medium w-12 text-center text-slate-900 dark:text-white">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"><ZoomIn size={18} /></button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setElements([])} className="px-3 py-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">Limpiar</button>
            <button onClick={deleteSelected} disabled={!selectedId} className={`p-1.5 rounded transition-colors ${selectedId ? 'text-red-500 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700' : 'text-slate-300 dark:text-slate-600'}`}><Trash2 size={18} /></button>
            <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-colors shadow-sm ml-2 flex items-center gap-2">
              <Download size={16} /> Guardar
            </button>
          </div>
        </motion.div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-8 relative">
          {/* Grid Background */}
          <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: zoom, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative bg-white dark:bg-slate-800 shadow-2xl transition-transform"
            style={{ 
              width: 500, 
              height: 600, 
              transformOrigin: 'center center'
            }}
          >
            {/* Product Mockup Background */}
            {product && (
              <img 
                src={product.image} 
                alt="Mockup" 
                className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
                referrerPolicy="no-referrer"
              />
            )}
            
            {/* Print Area Guide */}
            <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 border-2 border-dashed border-blue-500/30 pointer-events-none flex items-center justify-center">
              <span className="text-blue-500/30 font-bold uppercase tracking-widest text-sm">Área de Impresión</span>
            </div>

            {/* Draggable Elements */}
            <DndContext sensors={sensors} onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
              {elements.map(el => (
                <DraggableItem 
                  key={el.id} 
                  element={el} 
                  isSelected={selectedId === el.id} 
                  onSelect={(id) => setSelectedId(id)} 
                />
              ))}
            </DndContext>
          </motion.div>
        </div>
      </div>

      {/* Right Column: Properties & Order */}
      <motion.div 
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        className="w-72 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 flex flex-col shrink-0 overflow-y-auto transition-colors duration-300 z-20 shadow-lg"
      >
        {/* Element Properties */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">Propiedades</h3>
          {selectedElement ? (
            <div className="space-y-4">
              {selectedElement.type === 'text' && (
                <>
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Texto</label>
                    <input 
                      type="text" 
                      value={selectedElement.content} 
                      onChange={(e) => updateSelected({ content: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Tamaño de fuente</label>
                    <input 
                      type="number" 
                      value={selectedElement.fontSize} 
                      onChange={(e) => updateSelected({ fontSize: Number(e.target.value) })}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </>
              )}
              {(selectedElement.type === 'text' || selectedElement.type === 'shape') && (
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Color</label>
                  <div className="flex gap-2">
                    {['#ffffff', '#000000', '#ef4444', '#3b82f6', '#22c55e', '#eab308'].map(c => (
                      <button 
                        key={c} 
                        onClick={() => updateSelected({ color: c })}
                        className={`w-6 h-6 rounded-full border-2 ${selectedElement.color === c ? 'border-blue-500' : 'border-transparent shadow-sm'}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {selectedElement.type !== 'text' && (
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Ancho</label>
                    <input type="number" value={selectedElement.width} onChange={(e) => updateSelected({ width: Number(e.target.value) })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-sm text-slate-900 dark:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Alto</label>
                    <input type="number" value={selectedElement.height} onChange={(e) => updateSelected({ height: Number(e.target.value) })} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-sm text-slate-900 dark:text-white transition-colors" />
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Capas (Z-Index)</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => updateSelected({ zIndex: (selectedElement.zIndex || 1) - 1 })}
                    className="flex-1 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-sm text-slate-900 dark:text-white transition-colors"
                  >
                    Atrás
                  </button>
                  <button 
                    onClick={() => updateSelected({ zIndex: (selectedElement.zIndex || 1) + 1 })}
                    className="flex-1 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-sm text-slate-900 dark:text-white transition-colors"
                  >
                    Adelante
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">Selecciona un elemento en el lienzo para editar sus propiedades.</p>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">Detalles del Pedido</h3>
          <div className="space-y-4 flex-1">
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Producto</label>
              <div className="text-sm font-medium text-slate-900 dark:text-white">{product?.name || 'Producto Personalizado'}</div>
            </div>
            
            {product?.type === 'apparel' && (
              <div>
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Talla</label>
                <div className="grid grid-cols-5 gap-1">
                  {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
                    <button 
                      key={s}
                      onClick={() => setSize(s)}
                      className={`py-1 text-xs font-bold rounded border transition-colors ${size === s ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product?.type === 'banner' && (
              <div>
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Tamaño</label>
                <select 
                  value={size} 
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="60x90cm">60x90 cm</option>
                  <option value="1x2m">1x2 m</option>
                  <option value="2x3m">2x3 m</option>
                  <option value="3x4m">3x4 m</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Cantidad</label>
              <div className="flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded overflow-hidden transition-colors">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">-</button>
                <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} className="w-full text-center bg-transparent text-sm font-bold text-slate-900 dark:text-white focus:outline-none" />
                <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">+</button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 mt-4 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 dark:text-slate-400">Total</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">${totalPrice.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => onNavigate('checkout', product || undefined)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <ShoppingCart size={18} /> Hacer Pedido
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
