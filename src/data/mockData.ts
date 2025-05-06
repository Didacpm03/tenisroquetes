import { Product, CartItem } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Air Max 270',
    brand: 'Nike',
    price: 150,
    salePrice: 129.99,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.5,
    reviewCount: 124,
    onSale: true,
    isNew: false,
    colors: ['Black', 'White', 'Red'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    description: 'The Nike Air Max 270 delivers visible cushioning under every step with a large window and 270 degrees of Air.'
  },
  {
    id: '2',
    name: 'Ultraboost 21',
    brand: 'Adidas',
    price: 180,
    image: 'https://images.pexels.com/photos/2421374/pexels-photo-2421374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.8,
    reviewCount: 97,
    onSale: false,
    isNew: true,
    colors: ['Black', 'White', 'Blue'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    description: 'Ultraboost 21 delivers incredible energy return and comfort for your longest runs.'
  },
  {
    id: '3',
    name: '574 Classic',
    brand: 'New Balance',
    price: 79.99,
    image: 'https://images.pexels.com/photos/3261069/pexels-photo-3261069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.2,
    reviewCount: 56,
    onSale: false,
    isNew: false,
    colors: ['Grey', 'Navy', 'Red'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    description: 'The 574 Classic combines a distinctive look with premium materials for everyday wear.'
  },
  {
    id: '4',
    name: 'Old Skool',
    brand: 'Vans',
    price: 60,
    salePrice: 45,
    image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.6,
    reviewCount: 213,
    onSale: true,
    isNew: false,
    colors: ['Black', 'White', 'Blue', 'Red'],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    description: 'The Vans Old Skool is a classic skate shoe and the first to bear the iconic side stripe.'
  },
  {
    id: '5',
    name: 'Chuck Taylor All Star',
    brand: 'Converse',
    price: 55,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.4,
    reviewCount: 178,
    onSale: false,
    isNew: false,
    colors: ['Black', 'White', 'Red', 'Navy'],
    sizes: ['5', '6', '7', '8', '9', '10', '11', '12'],
    description: 'The Chuck Taylor All Star is the most iconic sneaker in the world, recognized for its unmistakable silhouette.'
  },
  {
    id: '6',
    name: 'RS-X³ Puzzle',
    brand: 'Puma',
    price: 110,
    salePrice: 89.99,
    image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.1,
    reviewCount: 42,
    onSale: true,
    isNew: true,
    colors: ['Black', 'White', 'Yellow'],
    sizes: ['7', '8', '9', '10', '11'],
    description: 'The RS-X³ Puzzle reinvents PUMA\'s 80s Running System technology with bold colors and design elements.'
  }
];

export const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Air Max 270',
    brand: 'Nike',
    price: 129.99,
    quantity: 1,
    color: 'Black',
    size: '10',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    name: 'Ultraboost 21',
    brand: 'Adidas',
    price: 180,
    quantity: 1,
    color: 'White',
    size: '9',
    image: 'https://images.pexels.com/photos/2421374/pexels-photo-2421374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '4',
    name: 'Old Skool',
    brand: 'Vans',
    price: 45,
    quantity: 1,
    color: 'Black',
    size: '8',
    image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];