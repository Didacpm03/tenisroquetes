import React from 'react';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Air Jordan 4 Retro Red Thunder',
    image: 'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg',
    price: 349,
  },
  {
    id: '2',
    name: 'Air Jordan 4 Retro University Blue',
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
    price: 395,
  },
  {
    id: '3',
    name: 'Air Jordan 4 Retro Tech Grey',
    image: 'https://images.pexels.com/photos/1619652/pexels-photo-1619652.jpeg',
    price: 289,
  },
  {
    id: '4',
    name: 'Air Jordan 4 Retro Midnight Navy',
    image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
    price: 279,
  },
];

const RelatedProducts: React.FC = () => {
  return (
    <div className="related-products">
      <h2 className="text-xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="aspect-square overflow-hidden bg-gray-100 rounded-lg mb-2">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</h3>
            <p className="text-sm font-medium mt-1">€{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;