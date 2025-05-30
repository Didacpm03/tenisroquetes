import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleComprar = () => {
    if (product.href) {
      navigate(product.href);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg">
      {/* Sale badge */}
      {product.onSale && (
        <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          SALE
        </div>
      )}

      {/* New badge */}
      {product.isNew && (
        <div className="absolute top-4 left-4 z-10 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
          NEW
        </div>
      )}

      {/* Image container */}
      <div className="aspect-w-3 aspect-h-3 bg-gray-100 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
        />

        {/* Quick action buttons */}
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex justify-center space-x-2">
            <button
              onClick={handleComprar}
              className="bg-gray-900 text-white px-3 py-2 rounded flex items-center justify-center text-sm font-medium flex-grow hover:bg-gray-800 transition-colors"
            >
              <ShoppingBag size={18} className="mr-2" />
              Comprar
            </button>
          </div>
        </div>
      </div>

      {/* Product details */}
      <div className="p-4">
        <h3 className="text-gray-700 font-medium mb-1">{product.brand}</h3>
        <h2 className="text-gray-900 font-bold mb-2">{product.name}</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {product.onSale ? (
              <>
                <p className="text-gray-900 font-bold">${product.salePrice}</p>
                <p className="text-gray-500 line-through ml-2">${product.price}</p>
              </>
            ) : (
              <p className="text-gray-900 font-bold">${product.price}</p>
            )}
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-gray-500 text-xs ml-1">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;



