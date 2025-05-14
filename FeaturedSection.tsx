import React from 'react';

const FeaturedSection: React.FC = () => {
  return (
    <div className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* First section: Left image, right text */}
        <div className="flex flex-col lg:flex-row items-center mb-24">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1124466/pexels-photo-1124466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Premium quality sneakers"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-500 rounded-lg p-4 shadow-lg hidden md:block">
                <p className="text-white font-bold text-xl">Premium Quality</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Crafted with Precision</h2>
            <p className="text-lg text-gray-600 mb-6">
              Every pair of sneakers in our collection is selected for exceptional quality and craftsmanship. 
              We partner with top brands who share our dedication to creating durable, comfortable footwear 
              that doesn't compromise on style.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Premium materials for ultimate durability</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Engineered for all-day comfort</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Authentic products with brand guarantee</span>
              </li>
            </ul>
            <a
              href="/about"
              className="inline-flex items-center text-orange-500 font-medium hover:text-orange-600 transition-colors"
            >
              Learn more about our quality standards
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Second section: Right image, left text */}
        <div className="flex flex-col lg:flex-row-reverse items-center">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pl-12">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Limited edition sneakers"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-blue-500 rounded-lg p-4 shadow-lg hidden md:block">
                <p className="text-white font-bold text-xl">Exclusive Drops</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Ahead with Limited Editions</h2>
            <p className="text-lg text-gray-600 mb-6">
              Be the first to access exclusive releases and limited-edition collaborations. 
              Our dedicated team works directly with brands to bring you the most sought-after 
              sneakers before they're gone.
            </p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8">
              <h3 className="font-bold text-gray-900 mb-2">Join the Exclusive Club</h3>
              <p className="text-gray-700 mb-4">
                Sign up for early access to drops, member-only discounts, and insider news.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                />
                <button className="px-6 py-2 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;