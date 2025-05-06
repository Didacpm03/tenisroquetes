export interface Link {
  name: string;
  path: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  salePrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  onSale: boolean;
  isNew: boolean;
  colors?: string[];
  sizes?: string[];
  description?: string;
}

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  image: string;
}