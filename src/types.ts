export type Screen = 'home' | 'catalog' | 'editor' | 'checkout' | 'quote' | 'gallery' | 'login' | 'admin';

export interface Product {
  id: string;
  name: string;
  category?: string;
  price: number;
  image?: string;
  img?: string;
  color?: string;
  variants?: string[];
  sizes?: string[];
  canvasW?: number;
  canvasH?: number;
  printArea?: { x: number; y: number; w: number; h: number };
  type: 'apparel' | 'banner' | 'mug' | 'sticker' | 'print' | 'card';
}

export interface CanvasElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  content: string; // text content or image URL
  x: number;
  y: number;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  width?: number;
  height?: number;
  rotation?: number;
  zIndex?: number;
  visible?: boolean;
  locked?: boolean;
  opacity?: number;
  shape?: string | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customization?: string;
}
