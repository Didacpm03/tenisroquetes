import React from 'react';
import { Facebook, Twitter, Instagram, Youtube as YouTube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and about */}
          <div>
            <h2 className="text-xl font-bold tracking-tighter mb-4">
              SNKR<span className="text-orange-500">HUB</span>
            </h2>
            <p className="text-gray-400 mb-6">
              Bienvenidos a la tienda del proyecto SNKRHUB, donde la moda y la tecnología se encuentran.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <YouTube size={20} />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tienda</h3>
            <ul className="space-y-3">
              <li>
                <a href="/category/men" className="text-gray-400 hover:text-white transition-colors">
                  Men
                </a>
              </li>
              <li>
                <a href="/category/women" className="text-gray-400 hover:text-white transition-colors">
                  Women
                </a>
              </li>
              <li>
                <a href="/new-arrivals" className="text-gray-400 hover:text-white transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="/sale" className="text-gray-400 hover:text-white transition-colors">
                  Sale
                </a>
              </li>
              <li>
                <a href="/category/limited-edition" className="text-gray-400 hover:text-white transition-colors">
                  Limited Editions
                </a>
              </li>
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/delivery" className="text-gray-400 hover:text-white transition-colors">
                  Delivery Information
                </a>
              </li>
              <li>
                <a href="/returns" className="text-gray-400 hover:text-white transition-colors">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="/size-guide" className="text-gray-400 hover:text-white transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Participantes</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={20} className="text-gray-400 mr-3" /><span className="text-gray-400">
                  Didac Paz Miquel
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-gray-400 mr-3" />
                <a href="tel:+12125555555" className="text-gray-400 hover:text-white transition-colors">
                  David Miguel Aguirre
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-gray-400 mr-3" />
                <a href="mailto:info@snkrhub.com" className="text-gray-400 hover:text-white transition-colors">
                  Alex Bujardon
                </a>
              </li>
            </ul>
          </div>
        </div>

      

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SNKRHUB. All rights reserved.
          </p>
          <div className="flex justify-center mt-4 space-x-6 text-sm">
            <a href="/privacy" className="text-gray-500 hover:text-gray-400 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-500 hover:text-gray-400 transition-colors">
              Terms of Service
            </a>
            <a href="/cookies" className="text-gray-500 hover:text-gray-400 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;