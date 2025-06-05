import React from 'react';
import Navbar from '../components/Navbar';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default Home;
