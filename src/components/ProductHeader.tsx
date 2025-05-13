import React from 'react';
import { Heart, Share2 } from 'lucide-react';

const ProductHeader: React.FC = () => {
  return (
    <div className="product-header mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Air Jordan 4 Retro Fear</h1>
          <p className="text-sm text-gray-500 mt-1">Men's Shoes</p>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Heart size={20} className="text-gray-700" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Share2 size={20} className="text-gray-700" />
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex items-center space-x-2 bg-gray-50 px-4 py-3 rounded-lg">
        <div className="rounded-full w-3 h-3 bg-green-500"></div>
        <p className="text-sm font-medium">
          100% Authentic Guarantee
        </p>
      </div>
      
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
          Condition: New
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
          Release: 2024
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
          Style: 126123-012
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
          Colorway: Black/White/Gray
        </span>
      </div>
    </div>
  );
};

export default ProductHeader;