import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DetailSection {
  title: string;
  content: React.ReactNode;
}

const ProductDetails: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('details');
  
  const toggleSection = (title: string) => {
    if (expandedSection === title) {
      setExpandedSection(null);
    } else {
      setExpandedSection(title);
    }
  };
  
  const sections: DetailSection[] = [
    {
      title: 'Product Details',
      content: (
        <div className="space-y-4">
          <p>
            The Nike Dunk Low Retro White/Black 2021 is a stylish sneaker that combines classic design with modern comfort. The black and white colorway adds versatility to this iconic silhouette, making it perfect for both casual and athletic wear.
          </p>
          <p>
            Featuring a premium leather upper, the Dunk Low Retro offers durability and support. A padded collar provides added comfort, and the Nike Swoosh adds a signature touch to the design.
          </p>
          <p>
            This release is part of the retro Dunk lineup, bringing back one of the most popular models in Nike's history.
          </p>
        </div>
      ),
    },
    {
      title: 'Authentication',
      content: (
        <div>
          <p className="mb-4">
            StockX guarantees 100% authenticity with every product we sell.
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Every item is verified by expert professionals</li>
            <li>We inspect materials, stitching, and packaging</li>
            <li>We use both advanced technology and hands-on inspection</li>
            <li>Only products passing all checks are delivered to customers</li>
          </ol>
        </div>
      ),
    },
    {
      title: 'Shipping & Returns',
      content: (
        <div className="space-y-3">
          <div>
            <h4 className="font-medium">Delivery</h4>
            <p className="text-sm text-gray-600">Items are shipped within 2 business days. Delivery time is typically 2-3 business days.</p>
          </div>
          <div>
            <h4 className="font-medium">International Shipping</h4>
            <p className="text-sm text-gray-600">International orders may incur customs duties and taxes.</p>
          </div>
          <div>
            <h4 className="font-medium">Returns</h4>
            <p className="text-sm text-gray-600">We do not offer returns or exchanges on this product.</p>
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <div className="product-details border border-gray-200 rounded-lg overflow-hidden">
      {sections.map((section) => (
        <div key={section.title} className="border-b border-gray-200 last:border-b-0">
          <button
            onClick={() => toggleSection(section.title)}
            className="w-full px-5 py-4 flex justify-between items-center text-left"
          >
            <h3 className="font-medium text-gray-900">{section.title}</h3>
            {expandedSection === section.title ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          
          <div 
            className={`px-5 pb-5 transition-all duration-300 overflow-hidden ${expandedSection === section.title ? 'max-h-[500px]' : 'max-h-0'}`}
          >
            {section.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;
