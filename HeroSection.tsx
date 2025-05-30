import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImage from ''; // importa tu imagen

const HeroSection: React.FC = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden bg-gray-900">
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
          scale,
          opacity,
          y
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-80" />
      
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              Step Up Your <br />
              <span className="text-orange-500">Sneaker Game</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-300">
              Discover the latest and greatest in sneaker culture. 
              Limited editions, classics, and exclusives all in one place.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <motion.a
                href="/category/featured"
                className="px-8 py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.a>
              <motion.a
                href="/new-arrivals"
                className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                New Arrivals
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-white text-sm font-medium mb-2">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;