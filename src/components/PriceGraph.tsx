import React, { useState } from 'react';

const PriceGraph: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'1M' | '3M' | '6M' | '1Y' | 'All'>('1M');
  
  // Sample price data points
  const prices = [
    { date: '2023-10-01', price: 220 },
    { date: '2023-10-15', price: 225 },
    { date: '2023-11-01', price: 218 },
    { date: '2023-11-15', price: 230 },
    { date: '2023-12-01', price: 223 },
    { date: '2023-12-15', price: 227 },
    { date: '2024-01-01', price: 225 },
    { date: '2024-01-15', price: 222 },
    { date: '2024-02-01', price: 228 },
    { date: '2024-02-15', price: 226 },
    { date: '2024-03-01', price: 229 },
    { date: '2024-03-15', price: 228 },
  ];
  
  // Calculate min and max prices for scaling
  const maxPrice = Math.max(...prices.map(p => p.price));
  const minPrice = Math.min(...prices.map(p => p.price));
  const range = maxPrice - minPrice;
  
  // Scale price to chart height (100px)
  const getY = (price: number) => {
    return 100 - ((price - minPrice) / range * 80);
  };
  
  // Generate path data for SVG
  const pathData = prices.map((point, index) => {
    const x = (index / (prices.length - 1)) * 100;
    const y = getY(point.price);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Recent sales data
  const recentSales = [
    { size: '10', price: 229, date: 'Today' },
    { size: '9', price: 226, date: 'Yesterday' },
    { size: '8.5', price: 235, date: '2 days ago' },
    { size: '11.5', price: 242, date: '3 days ago' },
  ];
  
  return (
    <div className="price-graph border border-gray-200 rounded-lg p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-900">Price History</h3>
        <div className="flex border border-gray-200 rounded-md overflow-hidden text-xs">
          {(['1M', '3M', '6M', '1Y', 'All'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 font-medium ${
                timeRange === range 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      
      <div className="graph-container h-[200px] relative">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="0" x2="100" y2="0" stroke="#f3f4f6" strokeWidth="0.5" />
          <line x1="0" y1="25" x2="100" y2="25" stroke="#f3f4f6" strokeWidth="0.5" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#f3f4f6" strokeWidth="0.5" />
          <line x1="0" y1="75" x2="100" y2="75" stroke="#f3f4f6" strokeWidth="0.5" />
          <line x1="0" y1="100" x2="100" y2="100" stroke="#f3f4f6" strokeWidth="0.5" />
          
          {/* Price line */}
          <path d={pathData} fill="none" stroke="#000000" strokeWidth="2" />
          
          {/* Fill area under the line */}
          <path 
            d={`${pathData} L 100 100 L 0 100 Z`} 
            fill="rgba(0,0,0,0.05)" 
          />
          
          {/* Dots for each data point */}
          {prices.map((point, index) => {
            const x = (index / (prices.length - 1)) * 100;
            const y = getY(point.price);
            return (
              <circle 
                key={index} 
                cx={x} 
                cy={y} 
                r="1.5" 
                fill="black" 
              />
            );
          })}
        </svg>
        
        {/* Y-axis labels */}
        <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-xs text-gray-500 pointer-events-none">
          <span>€{Math.round(maxPrice)}</span>
          <span>€{Math.round(minPrice + range * 0.75)}</span>
          <span>€{Math.round(minPrice + range * 0.5)}</span>
          <span>€{Math.round(minPrice + range * 0.25)}</span>
          <span>€{Math.round(minPrice)}</span>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="font-medium text-gray-900 mb-3">Recent Sales</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentSales.map((sale, index) => (
                <tr key={index}>
                  <td className="px-3 py-2 text-sm text-gray-900">US {sale.size}</td>
                  <td className="px-3 py-2 text-sm font-medium text-gray-900">€{sale.price}</td>
                  <td className="px-3 py-2 text-sm text-gray-500">{sale.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PriceGraph;