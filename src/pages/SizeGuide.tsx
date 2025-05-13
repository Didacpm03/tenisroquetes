import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Ruler, Footprints, ArrowRight } from 'lucide-react';

const SizeGuide: React.FC = () => {
  const menSizes = [
    { us: '6', uk: '5', eu: '38', cm: '24' },
    { us: '7', uk: '6', eu: '39', cm: '24.5' },
    { us: '8', uk: '7', eu: '40', cm: '25' },
    { us: '9', uk: '8', eu: '41', cm: '26' },
    { us: '10', uk: '9', eu: '42', cm: '27' },
    { us: '11', uk: '10', eu: '43', cm: '28' },
    { us: '12', uk: '11', eu: '44', cm: '29' },
    { us: '13', uk: '12', eu: '45', cm: '30' },
  ];

  const womenSizes = [
    { us: '5', uk: '3', eu: '35', cm: '22' },
    { us: '6', uk: '4', eu: '36', cm: '22.5' },
    { us: '7', uk: '5', eu: '37', cm: '23' },
    { us: '8', uk: '6', eu: '38', cm: '24' },
    { us: '9', uk: '7', eu: '39', cm: '25' },
    { us: '10', uk: '8', eu: '40', cm: '26' },
    { us: '11', uk: '9', eu: '41', cm: '27' },
    { us: '12', uk: '10', eu: '42', cm: '28' },
  ];

  const measurementTips = [
    {
      title: 'Measure in the Evening',
      description: 'Feet tend to swell throughout the day, so measuring in the evening ensures the best fit.',
      icon: '🌙',
    },
    {
      title: 'Wear Your Regular Socks',
      description: 'Measure while wearing the type of socks you plan to wear with your sneakers.',
      icon: '🧦',
    },
    {
      title: 'Measure Both Feet',
      description: 'Your feet might be slightly different sizes. Always go with the larger measurement.',
      icon: '📏',
    },
    {
      title: 'Stand While Measuring',
      description: 'Stand up straight to ensure weight distribution affects the measurement.',
      icon: '👣',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onCartClick={() => {}} />
      <div className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Size Guide</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find your perfect fit with our comprehensive size guide. We've made it easy to convert between different size systems and measure your feet accurately.
            </p>
          </div>

          {/* How to Measure Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Measure Your Feet</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="https://images.pexels.com/photos/4462781/pexels-photo-4462781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Measuring feet"
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-500 font-bold">1</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Place Paper on Floor</h3>
                    <p className="text-gray-600">Place a piece of paper on a hard floor against a wall.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-500 font-bold">2</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Stand on Paper</h3>
                    <p className="text-gray-600">Stand on the paper with your heel against the wall.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-500 font-bold">3</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Mark Longest Toe</h3>
                    <p className="text-gray-600">Mark the tip of your longest toe on the paper.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-500 font-bold">4</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Measure Length</h3>
                    <p className="text-gray-600">Measure the distance from the wall to the mark in centimeters.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Size Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Men's Sizes */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Ruler className="w-6 h-6 mr-2 text-orange-500" />
                Men's Sizes
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">US</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">UK</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">EU</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">CM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menSizes.map((size, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="px-4 py-2 text-gray-900">{size.us}</td>
                        <td className="px-4 py-2 text-gray-900">{size.uk}</td>
                        <td className="px-4 py-2 text-gray-900">{size.eu}</td>
                        <td className="px-4 py-2 text-gray-900">{size.cm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Women's Sizes */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Footprints className="w-6 h-6 mr-2 text-orange-500" />
                Women's Sizes
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">US</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">UK</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">EU</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">CM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {womenSizes.map((size, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="px-4 py-2 text-gray-900">{size.us}</td>
                        <td className="px-4 py-2 text-gray-900">{size.uk}</td>
                        <td className="px-4 py-2 text-gray-900">{size.eu}</td>
                        <td className="px-4 py-2 text-gray-900">{size.cm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Measurement Tips */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pro Tips for the Perfect Fit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {measurementTips.map((tip, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl mb-4">{tip.icon}</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-gray-600">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Brand-Specific Notes */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Brand-Specific Notes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border border-gray-200 rounded-lg">
                <img
                  src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Nike sizing"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nike</h3>
                <p className="text-gray-600">Nike tends to run true to size. For wide feet, consider going up half a size.</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <img
                  src="https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Adidas sizing"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Adidas</h3>
                <p className="text-gray-600">Adidas typically runs slightly large. Consider going down half a size.</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <img
                  src="https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="New Balance sizing"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-medium text-gray-900 mb-2">New Balance</h3>
                <p className="text-gray-600">New Balance offers multiple widths. Standard D width runs true to size.</p>
              </div>
            </div>
          </div>

          {/* Need Help CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still unsure about your size?</p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 transition-colors"
            >
              Contact Our Support Team
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SizeGuide;