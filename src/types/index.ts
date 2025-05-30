export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  onSale: boolean;
  isNew: boolean;
  styleCategory: string;
  colors: string[];
  sizes: string[];
  description: string;
  href?: string;
}

export interface CartItem {
  id: number; // antes era string
  name: string;
  brand: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  image: string;
}
