import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeItem, updateQuantity, cartTotal } = useCart();

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div
        className={`absolute top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-center px-4">
            <ShoppingBag size={48} className="text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div className="flex-grow overflow-y-auto p-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex border-b border-gray-200 pb-4">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">${item.price * item.quantity}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                        <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between">
                        <div className="flex items-center border border-gray-200 rounded">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-2 text-gray-700">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm font-medium text-orange-500 hover:text-orange-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart summary */}
            <div className="border-t border-gray-200 p-4 space-y-4">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${cartTotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <p>Shipping</p>
                <p>Calculated at checkout</p>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900">
                <p>Total</p>
                <p>${cartTotal.toFixed(2)}</p>
              </div>
              <div className="mt-6">
                <a
                  href="/checkout"
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-500 hover:bg-orange-600 transition-colors"
                >
                  Checkout
                </a>
                <div className="mt-4 text-center">
                  <button
                    onClick={onClose}
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;