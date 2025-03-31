import React, { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = {
  bookID: number;
  title: string;
  price: number;
  quantity: number;
  subtotal: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity' | 'subtotal'>) => void;
  removeFromCart: (bookID: number) => void;
  updateQuantity: (bookID: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from sessionStorage on mount
  useEffect(() => {
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, 'quantity' | 'subtotal'>) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.bookID === item.bookID);
      if (existing) {
        return prev.map((i) =>
          i.bookID === item.bookID
            ? { ...i, quantity: i.quantity + 1, subtotal: (i.quantity + 1) * i.price }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1, subtotal: item.price }];
    });
  };

  const removeFromCart = (bookID: number) => {
    setCart((prev) => prev.filter((i) => i.bookID !== bookID));
  };

  const updateQuantity = (bookID: number, quantity: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.bookID === bookID ? { ...i, quantity, subtotal: quantity * i.price } : i
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};
