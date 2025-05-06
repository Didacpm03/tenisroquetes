import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../data/mockData';
import { useParams } from 'react-router-dom';

const CategoryPage: React.FC = () => {
  const { category } = useParams();
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  
  const getCategoryTitle = () => {
    switch (category) {
      case 'men':
        return 'Men\'s Collection';
      case 'women':
        return 'Women\'s Collection';
      case 'new-arrivals':
        return 'New Arrivals';
      case 'sale':
        return 'Sale Items';
      default:
        return 'All Products';
    }
  };

  const filteredProducts = React.useMemo(() => {
    switch (category) {
      case 'sale':
        return mockProducts.filter(product => product.onSale);
      case 'new-arrivals':
        return mockProducts.filter(product => product.isNew);
      default:
        return mockProducts;
    }
  }, [category]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      
      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{getCategoryTitle()}</h1>
            <p className="text-lg text-gray-600">Discover our latest collection of premium sneakers</p>
          </div>

          {/* Filters */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-4">
              <select className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm">
                <option>Sort by</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
              <select className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm">
                <option>Brand</option>
                <option>Nike</option>
                <option>Adidas</option>
                <option>Puma</option>
              </select>
            </div>
            <p className="text-sm text-gray-600">{filteredProducts.length} products</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;