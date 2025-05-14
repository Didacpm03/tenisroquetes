import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router-dom';

const CategoryPage: React.FC = () => {
  const { category } = useParams();
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const getProducts = () => {
  const existingData = localStorage.getItem('products');

  if (!existingData) {
    const sampleProducts = [
      {
        id: 1,
        name: 'Air Max Classic',
        model: 'Nike',
        price: 120,
        categories: ['men', 'new-arrivals'],
    image: "https://images.pexels.com/photos/1503009/pexels-photo-1503009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 2,
        name: 'Ultraboost 21',
        model: 'Adidas',
        price: 150,
        categories: ['men'],
        image: 'https://via.placeholder.com/300x300?text=Ultraboost+21',
      },
      {
        id: 3,
        name: 'Chuck Taylor',
        model: 'Converse',
        price: 70,
        categories: ['women'],
        image: 'https://via.placeholder.com/300x300?text=Chuck+Taylor',
      },
      {
        id: 4,
        name: 'Gel-Lyte III',
        model: 'Asics',
        price: 110,
        categories: ['men', 'sale'],
        image: 'https://via.placeholder.com/300x300?text=Gel-Lyte+III',
      },
      {
        id: 5,
        name: 'Stan Smith',
        model: 'Adidas',
        price: 85,
        categories: ['women', 'sale'],
        image: 'https://via.placeholder.com/300x300?text=Stan+Smith',
      },
      {
        id: 6,
        name: 'Zoom Freak',
        model: 'Nike',
        price: 130,
        categories: ['men'],
        image: 'https://via.placeholder.com/300x300?text=Zoom+Freak',
      },
    ];

    localStorage.setItem('products', JSON.stringify(sampleProducts));
    return sampleProducts;
  }

  return JSON.parse(existingData);
};


  const filteredProducts = getProducts().filter((product: any) =>
    product.categories.includes(category)
  );

  const getCategoryTitle = () => {
    switch (category) {
      case 'men':
        return "Men's Collection";
      case 'women':
        return "Women's Collection";
      case 'new-arrivals':
        return 'New Arrivals';
      case 'sale':
        return 'Sale Items';
      default:
        return 'All Products';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{getCategoryTitle()}</h1>
            <p className="text-lg text-gray-600">Discover our latest collection of premium sneakers</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product: any) => (
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
