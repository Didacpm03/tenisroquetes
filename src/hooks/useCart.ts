import { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { mockCartItems } from '../data/mockData';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    // Calculate cart total whenever cart items change
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setCartTotal(total);
  }, [cartItems]);

  const addItem = (item: CartItem) => {
    // Check if item is already in cart
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex >= 0) {
      // If item exists, update quantity
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += item.quantity;
      setCartItems(updatedItems);
    } else {
      // If item doesn't exist, add to cart
      setCartItems([...cartItems, item]);
    }
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return {
    cartItems,
    cartTotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
};