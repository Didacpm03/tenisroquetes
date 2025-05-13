import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const PricingSection: React.FC = () => {
  const [tab, setTab] = useState<'buy' | 'sell'>('buy');
  
  return (
    <div className="pricing-section border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex">
        <button
          onClick={() => setTab('buy')}
          className={`w-1/2 py-3 text-center font-medium text-sm ${
            tab === 'buy' 
              ? 'bg-black text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setTab('sell')}
          className={`w-1/2 py-3 text-center font-medium text-sm ${
            tab === 'sell' 
              ? 'bg-black text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Sell
        </button>
      </div>
      
      <div className="p-5">
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">
            {tab === 'buy' ? 'Lowest Ask' : 'Highest Bid'}
          </p>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">€129</span>
            <span className="ml-2 text-xs text-gray-500">+ €15 envío</span>
          </div>
        </div>
        
        <button className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded flex items-center justify-center space-x-2 transition-colors">
          <span>{tab === 'buy' ? 'Buy Now' : 'Sell Now'}</span>
          <ArrowRight size={16} />
        </button>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm py-2 border-b border-gray-100">
            <span className="text-gray-600">Last Sale:</span>
            <span className="font-medium">€120</span>
          </div>
          
          {tab === 'buy' && (
            <>
              <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                <span className="text-gray-600">Guaranteed Delivery:</span>
                <span className="font-medium">2-3 business days</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-gray-600">Expedited Shipping:</span>
                <span className="font-medium">€25</span>
              </div>
            </>
          )}
          
          {tab === 'sell' && (
            <>
              <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                <span className="text-gray-600">Transaction Fee:</span>
                <span className="font-medium">9.5%</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-gray-600">Payout:</span>
                <span className="font-medium">1-2 business days</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
