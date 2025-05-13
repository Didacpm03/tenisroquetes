import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const faqs = {
    'Ordering & Payment': [
      {
        question: 'How do I place an order?',
        answer: 'You can place an order by browsing our products, selecting your desired items, adding them to your cart, and proceeding to checkout. Follow the steps to enter your shipping and payment information.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.'
      },
      {
        question: 'Is it safe to use my credit card on your website?',
        answer: 'Yes, we use industry-standard SSL encryption to protect your payment information. Your credit card details are never stored on our servers.'
      }
    ],
    'Shipping & Delivery': [
      {
        question: 'How long will it take to receive my order?',
        answer: 'Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business day delivery.'
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to most countries worldwide. International shipping times vary by location.'
      },
      {
        question: 'How much does shipping cost?',
        answer: 'Shipping costs vary based on your location and chosen shipping method. Free shipping is available for orders over $100 within the US.'
      }
    ],
    'Returns & Refunds': [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for unworn items in original condition with tags attached.'
      },
      {
        question: 'How do I initiate a return?',
        answer: 'Log into your account, go to your orders, and select the item you wish to return. Follow the prompts to generate a return label.'
      },
      {
        question: 'When will I receive my refund?',
        answer: 'Refunds are processed within 3-5 business days after we receive your return. The funds may take an additional 2-5 business days to appear in your account.'
      }
    ],
    'Product Information': [
      {
        question: 'How do I find my size?',
        answer: 'Check our size guide for detailed measurements. If you\'re between sizes, we recommend ordering the larger size.'
      },
      {
        question: 'Are your products authentic?',
        answer: 'Yes, we only sell 100% authentic products sourced directly from authorized manufacturers and distributors.'
      },
      {
        question: 'What if an item is out of stock?',
        answer: 'You can sign up for email notifications to be alerted when the item is back in stock.'
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onCartClick={() => {}} />
      <div className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600">
              Find answers to common questions about our products and services.
            </p>
          </div>

          <div className="space-y-8">
            {Object.entries(faqs).map(([section, questions]) => (
              <div key={section} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  className="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                  onClick={() => setOpenSection(openSection === section ? null : section)}
                >
                  <h2 className="text-xl font-semibold text-gray-900">{section}</h2>
                  {openSection === section ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>

                {openSection === section && (
                  <div className="px-6 py-4 space-y-4">
                    {questions.map((faq, index) => (
                      <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;