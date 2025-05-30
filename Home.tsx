import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import FeaturedSection from '../components/FeaturedSection';
import BrandsBanner from '../components/BrandsBanner';
import Footer from '../components/Footer';
import { mockProducts } from '../data/mockData';
import Cart from '../components/Cart';

const Home: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <HeroSection />
      <Categories />
      <FeaturedProducts products={mockProducts} />
      <FeaturedSection />
      <BrandsBanner />
      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Home;