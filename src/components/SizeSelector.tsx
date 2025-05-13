import React, { useState } from 'react';

interface SizeOption {
  size: string;
  euSize: string;
  inStock: boolean;
  price: number;
}

const sizes: SizeOption[] = [
  { size: '7', euSize: '40', inStock: true, price: 229 },
  { size: '7.5', euSize: '40.5', inStock: true, price: 235 },
  { size: '8', euSize: '41', inStock: true, price: 229 },
  { size: '8.5', euSize: '42', inStock: true, price: 245 },
  { size: '9', euSize: '42.5', inStock: true, price: 229 },
  { size: '9.5', euSize: '43', inStock: true, price: 250 },
  { size: '10', euSize: '44', inStock: true, price: 229 },
  { size: '10.5', euSize: '44.5', inStock: true, price: 260 },
  { size: '11', euSize: '45', inStock: true, price: 229 },
  { size: '11.5', euSize: '45.5', inStock: false, price: 280 },
  { size: '12', euSize: '46', inStock: true, price: 229 },
  { size: '12.5', euSize: '47', inStock: false, price: 300 },
  { size: '13', euSize: '47.5', inStock: true, price: 229 },
  { size: '14', euSize: '48.5', inStock: false, price: 330 },
];

const SizeSelector: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeType, setSizeType] = useState<'us' | 'eu'>('us');
  
  return (
    <div className="size-selector mt-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-gray-900">Select Size</h3>
        <div className="flex border border-gray-200 rounded-md overflow-hidden">
          <button
            onClick={() => setSizeType('us')}
            className={`px-4 py-1 text-xs font-medium ${
              sizeType === 'us' 
                ? 'bg-black text-white' 
                : 'bg-white text-gray-700'
            }`}
          >
            US
          </button>
          <button
            onClick={() => setSizeType('eu')}
            className={`px-4 py-1 text-xs font-medium ${
              sizeType === 'eu' 
                ? 'bg-black text-white' 
                : 'bg-white text-gray-700'
            }`}
          >
            EU
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {sizes.map((sizeOption) => (
          <button
            key={sizeOption.size}
            onClick={() => setSelectedSize(sizeOption.size)}
            disabled={!sizeOption.inStock}
            className={`
              py-3 border rounded-md text-sm transition-colors
              ${selectedSize === sizeOption.size 
                ? 'border-black bg-black text-white' 
                : 'border-gray-200 hover:border-gray-300'}
              ${!sizeOption.inStock && 'opacity-50 cursor-not-allowed'}
            `}
          >
            <div className="font-medium">
              {sizeType === 'us' ? sizeOption.size : sizeOption.euSize}
            </div>
            {sizeOption.inStock && (
              <div className="text-xs mt-1">
                €{sizeOption.price}
              </div>
            )}
            {!sizeOption.inStock && (
              <div className="text-xs mt-1">
                {sizeType === 'us' ? 'Sold Out' : 'Agotado'}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;