import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  PenTool, Search, ChevronLeft, ChevronRight, Type, ImageIcon, 
  Square, Droplet, Undo2, Redo2, Eye, Save, ShoppingCart, 
  Bold, Italic, Palette, Trash2, Copy, ArrowUp, ArrowDown, 
  Lock, Unlock, EyeOff, Minus, Plus, MousePointer2, LayoutTemplate
} from 'lucide-react';

// --- Types & Constants ---
type ElementType = 'text' | 'shape' | 'image' | 'splash';

interface CanvasElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: number;
  bold?: boolean;
  italic?: boolean;
  rotation: number;
  opacity: number;
  locked: boolean;
  visible: boolean;
  zIndex: number;
  shapeType?: 'rect' | 'circle' | 'triangle';
}

const BRAND_COLORS = ['#00E5FF', '#0A3D8F', '#FFD700', '#6A1B9A', '#070B18', '#FFFFFF', '#E2E8F0', '#1A1A2E'];
const FONTS = ['Inter', 'Space Grotesk', 'Playfair Display', 'JetBrains Mono', 'Georgia', 'Arial'];

const uid = () => Math.random().toString(36).substring(2, 9);

// --- Ink Splash SVG Component ---
const InkSplash = ({ color = "#00E5FF", className = "" }: { color?: string, className?: string }) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className} style={{ fill: color }}>
    <path d="M45.7,-76.1C58.9,-69.3,69.2,-55.4,76.5,-40.8C83.8,-26.2,88.1,-10.9,86.2,3.8C84.3,18.5,76.2,32.6,66.1,44.2C56,55.8,43.9,64.9,30.4,71.1C16.9,77.3,2,80.6,-12.1,79.5C-26.2,78.4,-39.5,72.9,-51.1,64.2C-62.7,55.5,-72.6,43.6,-78.9,29.8C-85.2,16,-87.9,0.3,-84.8,-14.2C-81.7,-28.7,-72.8,-42,-61.2,-51.6C-49.6,-61.2,-35.3,-67.1,-21.3,-71.4C-7.3,-75.7,6.4,-78.4,20.8,-79.1C35.2,-79.8,50.3,-78.5,45.7,-76.1Z" transform="translate(100 100)" />
  </svg>
);

import { Screen, Product } from '../types';

interface EditorProps {
  onNavigate?: (screen: Screen, product?: Product) => void;
  product?: Product | null;
}

export default function Editor({ onNavigate, product }: EditorProps) {
  // --- State ---
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [history, setHistory] = useState<CanvasElement[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  const [zoom, setZoom] = useState(1);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [activeLeftTab, setActiveLeftTab] = useState<'elementos' | 'texto' | 'imagenes' | 'fondos'>('elementos');
  const [designName, setDesignName] = useState("Mi diseño");
  const [canvasBg, setCanvasBg] = useState("#FFFFFF");

  const canvasRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: string, type: string, startX: number, startY: number, initW: number, initH: number, initX: number, initY: number } | null>(null);

  // --- History Management ---
  const saveHistory = useCallback((newElements: CanvasElement[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = () => { if (historyIndex > 0) { setHistoryIndex(historyIndex - 1); setElements(history[historyIndex - 1]); } };
  const redo = () => { if (historyIndex < history.length - 1) { setHistoryIndex(historyIndex + 1); setElements(history[historyIndex + 1]); } };

  // --- Element Actions ---
  const addElement = (el: Partial<CanvasElement>) => {
    const newEl: CanvasElement = {
      id: uid(),
      type: 'shape',
      x: 50, y: 50,
      width: 100, height: 100,
      rotation: 0, opacity: 100,
      locked: false, visible: true,
      zIndex: elements.length + 1,
      ...el
    };
    const next = [...elements, newEl];
    setElements(next);
    saveHistory(next);
    setSelectedId(newEl.id);
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    const next = elements.map(e => e.id === id ? { ...e, ...updates } : e);
    setElements(next);
    saveHistory(next);
  };

  const deleteElement = (id: string) => {
    const next = elements.filter(e => e.id !== id);
    setElements(next);
    saveHistory(next);
    if (selectedId === id) setSelectedId(null);
  };

  const duplicateElement = (id: string) => {
    const el = elements.find(e => e.id === id);
    if (el) addElement({ ...el, x: el.x + 20, y: el.y + 20 });
  };

  const moveLayer = (id: string, direction: 'up' | 'down') => {
    const index = elements.findIndex(e => e.id === id);
    if (index < 0) return;
    if (direction === 'up' && index < elements.length - 1) {
      const next = [...elements];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      setElements(next);
      saveHistory(next);
    } else if (direction === 'down' && index > 0) {
      const next = [...elements];
      [next[index], next[index - 1]] = [next[index - 1], next[index]];
      setElements(next);
      saveHistory(next);
    }
  };

  // --- Drag & Resize ---
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragRef.current || !canvasRef.current) return;
    const { id, type, startX, startY, initW, initH, initX, initY } = dragRef.current;
    
    // Adjust for zoom
    const dx = (e.clientX - startX) / zoom;
    const dy = (e.clientY - startY) / zoom;

    setElements(prev => prev.map(el => {
      if (el.id !== id) return el;
      if (type === "move") {
        return { ...el, x: initX + dx, y: initY + dy };
      } else if (type.startsWith("resize")) {
        let newW = initW;
        let newH = initH;
        let newX = initX;
        let newY = initY;

        if (type.includes("e")) newW = Math.max(20, initW + dx);
        if (type.includes("s")) newH = Math.max(20, initH + dy);
        if (type.includes("w")) { newW = Math.max(20, initW - dx); newX = initX + (initW - newW); }
        if (type.includes("n")) { newH = Math.max(20, initH - dy); newY = initY + (initH - newH); }

        return { ...el, width: newW, height: newH, x: newX, y: newY };
      }
      return el;
    }));
  }, [zoom]);

  const handleMouseUp = useCallback(() => {
    if (dragRef.current) {
      saveHistory(elements);
      dragRef.current = null;
    }
  }, [elements, saveHistory]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // --- Keyboard Shortcuts ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;

      if (e.ctrlKey || e.metaKey) {
        if (e.key === "z") { e.preventDefault(); undo(); }
        if (e.key === "y" || (e.shiftKey && e.key === "z")) { e.preventDefault(); redo(); }
        if (e.key === "d" && selectedId) { e.preventDefault(); duplicateElement(selectedId); }
      }
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        e.preventDefault();
        deleteElement(selectedId);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [historyIndex, selectedId, elements]);

  const selectedEl = elements.find(e => e.id === selectedId);

  return (
    <div className="flex flex-col h-screen bg-[#1A1A2E] text-white font-sans overflow-hidden">
      
      {/* ─── TOP TOOLBAR ─── */}
      <header className="h-14 bg-[#070B18] border-b border-[#00E5FF]/20 flex items-center justify-between px-4 shrink-0 z-30">
        <div className="flex items-center gap-4 w-1/3">
          <div 
            className="flex items-center gap-2 text-[#00E5FF] cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onNavigate?.('home')}
          >
            <PenTool size={20} />
            <span className="font-bold tracking-tight hidden sm:inline">JC Creative</span>
          </div>
          <div className="h-6 w-px bg-white/10"></div>
          <input 
            type="text" 
            value={designName}
            onChange={(e) => setDesignName(e.target.value)}
            className="bg-transparent border border-transparent hover:border-white/10 focus:border-[#00E5FF]/50 rounded px-2 py-1 text-sm font-medium outline-none transition-colors w-48"
          />
        </div>

        <div className="flex items-center justify-center gap-2 w-1/3">
          <button onClick={undo} disabled={historyIndex === 0} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded disabled:opacity-30 transition-colors"><Undo2 size={18}/></button>
          <button onClick={redo} disabled={historyIndex === history.length - 1} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded disabled:opacity-30 transition-colors"><Redo2 size={18}/></button>
        </div>

        <div className="flex items-center justify-end gap-3 w-1/3">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors">
            <Eye size={16} /> Vista previa
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors">
            <Save size={16} /> Guardar
          </button>
          <button className="flex items-center gap-2 px-5 py-1.5 text-sm font-bold text-white bg-gradient-to-r from-[#00E5FF] to-[#6A1B9A] rounded-full shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] transition-all hover:scale-105">
            <ShoppingCart size={16} /> Pedir ahora
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* ─── LEFT SIDEBAR ─── */}
        <aside 
          className={`bg-[#0D1B3E] border-r border-[#00E5FF]/20 flex flex-col transition-all duration-300 z-20 shrink-0 ${leftSidebarOpen ? 'w-[280px]' : 'w-0 overflow-hidden'}`}
        >
          <div className="w-[280px] h-full flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-white/5">
              <div className="relative group">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00E5FF] transition-colors" />
                <input 
                  type="text" 
                  placeholder="Buscar recursos..." 
                  className="w-full bg-[#070B18] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:border-[#00E5FF] focus:shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-all"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/5">
              {[
                { id: 'elementos', icon: <Square size={16}/>, label: 'Elementos' },
                { id: 'texto', icon: <Type size={16}/>, label: 'Texto' },
                { id: 'imagenes', icon: <ImageIcon size={16}/>, label: 'Imágenes' },
                { id: 'fondos', icon: <Droplet size={16}/>, label: 'Fondos' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveLeftTab(tab.id as any)}
                  className={`flex-1 py-3 flex flex-col items-center gap-1 text-[10px] font-medium uppercase tracking-wider transition-colors ${activeLeftTab === tab.id ? 'text-[#00E5FF] border-b-2 border-[#00E5FF] bg-[#00E5FF]/5' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {activeLeftTab === 'elementos' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase">Formas Básicas</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <button onClick={() => addElement({ type: 'shape', shapeType: 'rect', color: '#0A3D8F' })} className="aspect-square bg-[#070B18] border border-white/10 rounded-lg flex items-center justify-center hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 transition-colors">
                        <div className="w-8 h-8 bg-gray-300 rounded-sm"></div>
                      </button>
                      <button onClick={() => addElement({ type: 'shape', shapeType: 'circle', color: '#FFD700' })} className="aspect-square bg-[#070B18] border border-white/10 rounded-lg flex items-center justify-center hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 transition-colors">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      </button>
                      <button onClick={() => addElement({ type: 'shape', shapeType: 'triangle', color: '#6A1B9A' })} className="aspect-square bg-[#070B18] border border-white/10 rounded-lg flex items-center justify-center hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 transition-colors">
                        <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[28px] border-b-gray-300"></div>
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase">Manchas de Tinta (Brand)</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => addElement({ type: 'splash', color: '#00E5FF', width: 150, height: 150 })} className="aspect-square bg-[#070B18] border border-white/10 rounded-lg flex items-center justify-center hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 transition-colors p-2">
                        <InkSplash color="#00E5FF" className="w-full h-full opacity-100" />
                      </button>
                      <button onClick={() => addElement({ type: 'splash', color: '#FFD700', width: 150, height: 150 })} className="aspect-square bg-[#070B18] border border-white/10 rounded-lg flex items-center justify-center hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 transition-colors p-2">
                        <InkSplash color="#FFD700" className="w-full h-full opacity-100" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeLeftTab === 'texto' && (
                <div className="space-y-3">
                  <button onClick={() => addElement({ type: 'text', content: 'Añadir un título', fontSize: 48, bold: true, color: '#FFFFFF' })} className="w-full py-4 bg-[#070B18] border border-white/10 rounded-lg hover:border-[#00E5FF] hover:bg-[#00E5FF]/5 transition-colors text-2xl font-bold">
                    Añadir un título
                  </button>
                  <button onClick={() => addElement({ type: 'text', content: 'Añadir un subtítulo', fontSize: 24, bold: true, color: '#E2E8F0' })} className="w-full py-3 bg-[#070B18] border border-white/10 rounded-lg hover:border-[#00E5FF] hover:bg-[#00E5FF]/5 transition-colors text-lg font-semibold">
                    Añadir un subtítulo
                  </button>
                  <button onClick={() => addElement({ type: 'text', content: 'Añadir texto de cuerpo', fontSize: 16, color: '#94A3B8' })} className="w-full py-2 bg-[#070B18] border border-white/10 rounded-lg hover:border-[#00E5FF] hover:bg-[#00E5FF]/5 transition-colors text-sm">
                    Añadir texto de cuerpo
                  </button>
                </div>
              )}

              {activeLeftTab === 'fondos' && (
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold text-gray-400 mb-2 uppercase">Colores de Marca</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {BRAND_COLORS.map(c => (
                      <button 
                        key={c} 
                        onClick={() => setCanvasBg(c)}
                        className="aspect-square rounded-md border border-white/20 hover:scale-110 transition-transform shadow-sm"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Toggle Left Sidebar Button */}
        <button 
          onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-[#0D1B3E] border border-[#00E5FF]/20 border-l-0 rounded-r-lg p-1 text-gray-400 hover:text-[#00E5FF] shadow-lg"
          style={{ transform: `translate(${leftSidebarOpen ? '280px' : '0'}, -50%)` }}
        >
          {leftSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* ─── CENTER CANVAS WORKSPACE ─── */}
        <main 
          className="flex-1 relative overflow-hidden flex items-center justify-center"
          style={{
            backgroundColor: '#1A1A2E',
            backgroundImage: 'radial-gradient(circle, rgba(0, 229, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
          onClick={() => setSelectedId(null)}
        >
          {/* Rulers (Visual representation) */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-[#070B18] border-b border-white/10 flex items-end overflow-hidden z-10 opacity-80">
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 border-l border-white/20 h-2" style={{ width: '50px' }}>
                <span className="text-[8px] text-gray-500 ml-1 block -mt-3">{i * 50}</span>
              </div>
            ))}
          </div>
          <div className="absolute top-0 left-0 bottom-0 w-6 bg-[#070B18] border-r border-white/10 flex flex-col items-end overflow-hidden z-10 opacity-80 pt-6">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 border-t border-white/20 w-2" style={{ height: '50px' }}>
                <span className="text-[8px] text-gray-500 block -ml-4 mt-1">{i * 50}</span>
              </div>
            ))}
          </div>

          {/* Product Label */}
          <div className="absolute top-10 left-10 bg-[#070B18]/80 backdrop-blur border border-white/10 px-3 py-1.5 rounded-md flex items-center gap-2 z-10 shadow-lg">
            <LayoutTemplate size={14} className="text-[#00E5FF]" />
            <span className="text-xs font-medium text-gray-300">
              {product ? `${product.name} ${product.sizes?.[0] || ''}` : 'Tarjeta de presentación 9x5cm'}
            </span>
          </div>

          {/* Canvas Container */}
          <div 
            className="relative shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-transform origin-center"
            style={{ 
              width: 900, 
              height: 500, 
              transform: `scale(${zoom})`,
              backgroundColor: canvasBg 
            }}
          >
            <div ref={canvasRef} className="absolute inset-0 overflow-hidden">
              {elements.map(el => {
                if (!el.visible) return null;
                const isSelected = selectedId === el.id;
                
                return (
                  <div
                    key={el.id}
                    className={`absolute ${isSelected ? 'ring-1 ring-[#00E5FF]' : ''}`}
                    style={{
                      left: el.x, top: el.y,
                      width: el.width, height: el.height,
                      transform: `rotate(${el.rotation}deg)`,
                      opacity: el.opacity / 100,
                      zIndex: el.zIndex,
                      cursor: el.locked ? 'default' : 'move'
                    }}
                    onClick={(e) => { e.stopPropagation(); setSelectedId(el.id); }}
                    onMouseDown={(e) => {
                      if (el.locked) return;
                      e.stopPropagation();
                      setSelectedId(el.id);
                      if (canvasRef.current) {
                        dragRef.current = {
                          id: el.id, type: 'move',
                          startX: e.clientX, startY: e.clientY,
                          initW: el.width, initH: el.height,
                          initX: el.x, initY: el.y
                        };
                      }
                    }}
                  >
                    {/* Render Content */}
                    {el.type === 'shape' && (
                      <div 
                        className="w-full h-full"
                        style={{
                          backgroundColor: el.shapeType !== 'triangle' ? el.color : 'transparent',
                          borderRadius: el.shapeType === 'circle' ? '50%' : 0,
                          borderLeft: el.shapeType === 'triangle' ? `${el.width/2}px solid transparent` : undefined,
                          borderRight: el.shapeType === 'triangle' ? `${el.width/2}px solid transparent` : undefined,
                          borderBottom: el.shapeType === 'triangle' ? `${el.height}px solid ${el.color}` : undefined,
                        }}
                      />
                    )}
                    {el.type === 'splash' && (
                      <InkSplash color={el.color} className="w-full h-full" />
                    )}
                    {el.type === 'text' && (
                      <div 
                        className="w-full h-full flex items-center justify-center whitespace-pre-wrap leading-tight"
                        style={{
                          color: el.color,
                          fontFamily: el.fontFamily || 'Inter',
                          fontSize: `${el.fontSize}px`,
                          fontWeight: el.bold ? 'bold' : 'normal',
                          fontStyle: el.italic ? 'italic' : 'normal',
                        }}
                      >
                        {el.content}
                      </div>
                    )}

                    {/* Selection Handles */}
                    {isSelected && !el.locked && (
                      <>
                        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#00E5FF] border border-white rounded-full cursor-nwse-resize shadow-[0_0_5px_#00E5FF]" onMouseDown={(e) => { e.stopPropagation(); dragRef.current = { id: el.id, type: 'resize-nw', startX: e.clientX, startY: e.clientY, initW: el.width, initH: el.height, initX: el.x, initY: el.y }; }} />
                        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#00E5FF] border border-white rounded-full cursor-nesw-resize shadow-[0_0_5px_#00E5FF]" onMouseDown={(e) => { e.stopPropagation(); dragRef.current = { id: el.id, type: 'resize-ne', startX: e.clientX, startY: e.clientY, initW: el.width, initH: el.height, initX: el.x, initY: el.y }; }} />
                        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#00E5FF] border border-white rounded-full cursor-nesw-resize shadow-[0_0_5px_#00E5FF]" onMouseDown={(e) => { e.stopPropagation(); dragRef.current = { id: el.id, type: 'resize-sw', startX: e.clientX, startY: e.clientY, initW: el.width, initH: el.height, initX: el.x, initY: el.y }; }} />
                        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#00E5FF] border border-white rounded-full cursor-nwse-resize shadow-[0_0_5px_#00E5FF]" onMouseDown={(e) => { e.stopPropagation(); dragRef.current = { id: el.id, type: 'resize-se', startX: e.clientX, startY: e.clientY, initW: el.width, initH: el.height, initX: el.x, initY: el.y }; }} />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Floating Context Toolbar */}
          {selectedEl && !selectedEl.locked && (
            <div 
              className="absolute z-40 bg-[#0D1B3E]/90 backdrop-blur-md border border-[#00E5FF]/30 rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex items-center p-1 gap-1 transition-all"
              style={{
                top: `max(60px, calc(50% + ${(selectedEl.y - 250) * zoom}px - 60px))`,
                left: `calc(50% + ${(selectedEl.x - 450) * zoom}px)`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedEl.type === 'text' && (
                <>
                  <button onClick={() => updateElement(selectedEl.id, { bold: !selectedEl.bold })} className={`p-1.5 rounded hover:bg-white/10 ${selectedEl.bold ? 'text-[#00E5FF] bg-[#00E5FF]/10' : 'text-gray-300'}`}><Bold size={16}/></button>
                  <button onClick={() => updateElement(selectedEl.id, { italic: !selectedEl.italic })} className={`p-1.5 rounded hover:bg-white/10 ${selectedEl.italic ? 'text-[#00E5FF] bg-[#00E5FF]/10' : 'text-gray-300'}`}><Italic size={16}/></button>
                  <div className="w-px h-4 bg-white/20 mx-1"></div>
                </>
              )}
              <div className="relative group">
                <button className="p-1.5 rounded hover:bg-white/10 text-gray-300 flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full border border-white/50" style={{ backgroundColor: selectedEl.color || '#fff' }}></div>
                </button>
                <div className="absolute top-full left-0 mt-2 bg-[#070B18] border border-white/10 rounded-lg p-2 hidden group-hover:grid grid-cols-4 gap-1 shadow-xl">
                  {BRAND_COLORS.map(c => (
                    <button key={c} onClick={() => updateElement(selectedEl.id, { color: c })} className="w-6 h-6 rounded-full border border-white/20 hover:scale-110 transition-transform" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
              <div className="w-px h-4 bg-white/20 mx-1"></div>
              <button onClick={() => moveLayer(selectedEl.id, 'up')} className="p-1.5 rounded hover:bg-white/10 text-gray-300" title="Traer al frente"><ArrowUp size={16}/></button>
              <button onClick={() => moveLayer(selectedEl.id, 'down')} className="p-1.5 rounded hover:bg-white/10 text-gray-300" title="Enviar atrás"><ArrowDown size={16}/></button>
              <div className="w-px h-4 bg-white/20 mx-1"></div>
              <button onClick={() => duplicateElement(selectedEl.id)} className="p-1.5 rounded hover:bg-white/10 text-gray-300" title="Duplicar"><Copy size={16}/></button>
              <button onClick={() => deleteElement(selectedEl.id)} className="p-1.5 rounded hover:bg-red-500/20 text-red-400" title="Eliminar"><Trash2 size={16}/></button>
            </div>
          )}

          {/* Zoom Controls */}
          <div className="absolute bottom-6 right-6 bg-[#070B18]/80 backdrop-blur border border-white/10 rounded-full flex items-center p-1 shadow-lg z-20">
            <button onClick={() => setZoom(z => Math.max(0.1, z - 0.1))} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"><Minus size={16}/></button>
            <span className="text-xs font-medium w-12 text-center text-gray-300">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => Math.min(3, z + 0.1))} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"><Plus size={16}/></button>
          </div>
        </main>

        {/* ─── RIGHT SIDEBAR ─── */}
        <aside className="w-[260px] bg-[#0D1B3E] border-l border-[#00E5FF]/20 flex flex-col shrink-0 z-20">
          <div className="p-4 border-b border-white/5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Propiedades</h2>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {selectedEl ? (
              <div className="p-4 space-y-6">
                {/* Text Properties */}
                {selectedEl.type === 'text' && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Texto</label>
                      <textarea 
                        value={selectedEl.content}
                        onChange={(e) => updateElement(selectedEl.id, { content: e.target.value })}
                        className="w-full bg-[#070B18] border border-white/10 rounded-lg p-2 text-sm outline-none focus:border-[#00E5FF] resize-none h-20"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Fuente</label>
                      <select 
                        value={selectedEl.fontFamily || 'Inter'}
                        onChange={(e) => updateElement(selectedEl.id, { fontFamily: e.target.value })}
                        className="w-full bg-[#070B18] border border-white/10 rounded-lg p-2 text-sm outline-none focus:border-[#00E5FF] appearance-none"
                      >
                        {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Tamaño ({selectedEl.fontSize}px)</label>
                      <input 
                        type="range" min="8" max="150" 
                        value={selectedEl.fontSize || 16}
                        onChange={(e) => updateElement(selectedEl.id, { fontSize: Number(e.target.value) })}
                        className="w-full accent-[#00E5FF]"
                      />
                    </div>
                  </div>
                )}

                {/* Transform Properties */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase">Transformación</h3>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#070B18] border border-white/10 rounded-lg p-2 flex items-center gap-2">
                      <span className="text-xs text-gray-500">X</span>
                      <input type="number" value={Math.round(selectedEl.x)} onChange={(e) => updateElement(selectedEl.id, { x: Number(e.target.value) })} className="w-full bg-transparent text-sm outline-none" />
                    </div>
                    <div className="bg-[#070B18] border border-white/10 rounded-lg p-2 flex items-center gap-2">
                      <span className="text-xs text-gray-500">Y</span>
                      <input type="number" value={Math.round(selectedEl.y)} onChange={(e) => updateElement(selectedEl.id, { y: Number(e.target.value) })} className="w-full bg-transparent text-sm outline-none" />
                    </div>
                    <div className="bg-[#070B18] border border-white/10 rounded-lg p-2 flex items-center gap-2">
                      <span className="text-xs text-gray-500">W</span>
                      <input type="number" value={Math.round(selectedEl.width)} onChange={(e) => updateElement(selectedEl.id, { width: Number(e.target.value) })} className="w-full bg-transparent text-sm outline-none" />
                    </div>
                    <div className="bg-[#070B18] border border-white/10 rounded-lg p-2 flex items-center gap-2">
                      <span className="text-xs text-gray-500">H</span>
                      <input type="number" value={Math.round(selectedEl.height)} onChange={(e) => updateElement(selectedEl.id, { height: Number(e.target.value) })} className="w-full bg-transparent text-sm outline-none" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-500">Rotación</label>
                      <span className="text-xs text-gray-400">{selectedEl.rotation}°</span>
                    </div>
                    <input 
                      type="range" min="0" max="360" 
                      value={selectedEl.rotation}
                      onChange={(e) => updateElement(selectedEl.id, { rotation: Number(e.target.value) })}
                      className="w-full accent-[#00E5FF]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs text-gray-500">Opacidad</label>
                      <span className="text-xs text-gray-400">{selectedEl.opacity}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" 
                      value={selectedEl.opacity}
                      onChange={(e) => updateElement(selectedEl.id, { opacity: Number(e.target.value) })}
                      className="w-full accent-[#00E5FF]"
                    />
                  </div>

                  {/* Border and Shadow Toggles */}
                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase">Efectos</h3>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-xs text-gray-300 group-hover:text-white transition-colors">Borde</span>
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-8 h-4 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#00E5FF]"></div>
                      </div>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-xs text-gray-300 group-hover:text-white transition-colors">Sombra</span>
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-8 h-4 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#00E5FF]"></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center flex flex-col items-center justify-center h-48 text-gray-500">
                <MousePointer2 size={32} className="mb-3 opacity-20" />
                <p className="text-sm">Selecciona un elemento para editar sus propiedades</p>
              </div>
            )}

            {/* Layers Panel */}
            <div className="mt-auto border-t border-white/5">
              <div className="p-4 border-b border-white/5 bg-[#070B18]/50">
                <h3 className="text-xs font-semibold text-gray-400 uppercase">Capas</h3>
              </div>
              <div className="p-2 space-y-1">
                {elements.slice().reverse().map(el => (
                  <div 
                    key={el.id}
                    onClick={() => setSelectedId(el.id)}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${selectedId === el.id ? 'bg-[#00E5FF]/10 border border-[#00E5FF]/30' : 'hover:bg-white/5 border border-transparent'}`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      {el.type === 'text' ? <Type size={14} className="text-gray-400 shrink-0"/> : el.type === 'splash' ? <Droplet size={14} className="text-gray-400 shrink-0"/> : <Square size={14} className="text-gray-400 shrink-0"/>}
                      <span className="text-xs truncate text-gray-300">
                        {el.type === 'text' ? el.content : el.type === 'splash' ? 'Mancha de tinta' : 'Forma'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={(e) => { e.stopPropagation(); updateElement(el.id, { visible: !el.visible }); }} className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white">
                        {el.visible ? <Eye size={12}/> : <EyeOff size={12}/>}
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); updateElement(el.id, { locked: !el.locked }); }} className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white">
                        {el.locked ? <Lock size={12}/> : <Unlock size={12}/>}
                      </button>
                    </div>
                  </div>
                ))}
                {elements.length === 0 && (
                  <div className="text-center py-4 text-xs text-gray-600">No hay capas</div>
                )}
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
