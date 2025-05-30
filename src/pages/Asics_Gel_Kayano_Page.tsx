import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductViewer_asics from '../components/asics_gel_kayano/ProductViewer_asics';
import ProductHeader_asics from '../components/asics_gel_kayano/ProductHeader_asics';
import PricingSection_asics from '../components/asics_gel_kayano/PricingSection_asics';
import SizeSelector from '../components/SizeSelector';
import PriceGraph from '../components/PriceGraph';
import ProductDetails from '../components/ProductDetails';
import RelatedProducts from '../components/RelatedProducts';
import Footer from '../components/Footer';
import Cart from '../components/Cart';  

const AsicsGelKayanoPage: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <div className="mt-12" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:space-x-10">
          {/* Left Column - Product Viewer */}
          <div className="lg:w-1/2">
            <ProductViewer_asics />
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <ProductHeader_asics />
            <PricingSection_asics />
            <SizeSelector />
            <div className="mt-8">
              <PriceGraph />
            </div>
            <div className="mt-8">
              <ProductDetails />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <RelatedProducts />
        </div>
      </div>

      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default AsicsGelKayanoPage;