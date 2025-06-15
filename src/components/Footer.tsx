import React from 'react';


const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold tracking-tighter mb-4">
          TENNIS<span className="text-orange-500">ROQUETES</span>
        </h2>
        <p className="text-gray-400 mb-6">
          Web de Tennis Roquetes
        </p>
        <p className="text-gray-600 text-sm mt-6">
          &copy; {new Date().getFullYear()} Tennis Roquetes - Tots els drets reservats.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
