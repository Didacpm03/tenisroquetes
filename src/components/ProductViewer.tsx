import React, { useState, useEffect, useRef } from 'react';
import { Sliders } from 'lucide-react';

// Using consistent images of the same Jordan 4 Fear from different angles
const imageUrls = [
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img01.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img02.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img03.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img04.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img05.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img06.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img07.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img08.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img09.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img10.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img11.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img12.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img13.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img14.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img15.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img16.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img17.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img18.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img19.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img20.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img21.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img22.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img23.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img24.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img25.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img26.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img27.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img28.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img29.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img30.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img31.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img32.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img33.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img34.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img35.jpg',
  'https://images.stockx.com/360/Air-Jordan-4-Retro-Fear-2024/Images/Air-Jordan-4-Retro-Fear-2024/Lv2/img36.jpg'
];

const ProductViewer: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCurrentImageIndex(value);
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const containerWidth = containerRef.current?.clientWidth || 1;
    const deltaX = e.clientX - startX;
    const deltaPercentage = deltaX / containerWidth;
    const deltaIndex = Math.round(deltaPercentage * imageUrls.length);
    
    let newIndex = currentImageIndex - deltaIndex;
    if (newIndex < 0) newIndex = imageUrls.length - 1;
    if (newIndex >= imageUrls.length) newIndex = 0;
    
    if (newIndex !== currentImageIndex) {
      setCurrentImageIndex(newIndex);
      setStartX(e.clientX);
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const containerWidth = containerRef.current?.clientWidth || 1;
    const deltaX = e.touches[0].clientX - startX;
    const deltaPercentage = deltaX / containerWidth;
    const deltaIndex = Math.round(deltaPercentage * imageUrls.length);
    
    let newIndex = currentImageIndex - deltaIndex;
    if (newIndex < 0) newIndex = imageUrls.length - 1;
    if (newIndex >= imageUrls.length) newIndex = 0;
    
    if (newIndex !== currentImageIndex) {
      setCurrentImageIndex(newIndex);
      setStartX(e.touches[0].clientX);
    }
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Preload images
  useEffect(() => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);
  
  return (
    <div className="product-viewer">
      <div 
        ref={containerRef}
        className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-50 rounded-lg mb-4 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <img 
          src={imageUrls[currentImageIndex]} 
          alt={`Jordan 4 Retro Fear view ${currentImageIndex + 1}`}
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
        />
        <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-full text-xs text-gray-500 shadow-md">
          <div className="flex items-center space-x-2">
            <Sliders size={14} />
            <span>Drag to rotate</span>
          </div>
        </div>
      </div>
      
      {/* Slider control */}
      <div className="slider-control px-4">
        <input
          type="range"
          min="0"
          max={imageUrls.length - 1}
          value={currentImageIndex}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Rotate left</span>
          <span>Rotate right</span>
        </div>
      </div>
    </div>
  );
};

export default ProductViewer;