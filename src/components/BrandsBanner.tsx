import React from 'react';

const BrandsBanner: React.FC = () => {
  // These would typically be SVG logos in a real project
  const brands = [
    { id: 1, name: 'Nike' },
    { id: 2, name: 'Adidas' },
    { id: 3, name: 'New Balance' },
    { id: 4, name: 'Puma' },
    { id: 5, name: 'Converse' },
    { id: 6, name: 'Vans' },
  ];

  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-lg text-gray-600 mb-8">Trusted by the world's leading brands</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center justify-center">
              <span className="text-xl md:text-2xl font-bold text-gray-800">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsBanner;