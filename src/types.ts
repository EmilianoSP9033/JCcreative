export type Screen = 'home' | 'catalog' | 'editor' | 'checkout';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  variants: string[];
  type: 'apparel' | 'banner' | 'mug' | 'sticker';
}

export interface CanvasElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  content: string; // text content or image URL
  x: number;
  y: number;
  color?: string;
  fontSize?: number;
  width?: number;
  height?: number;
  rotation?: number;
  zIndex?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customization?: string;
}
