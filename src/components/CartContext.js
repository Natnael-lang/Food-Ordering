import React, { createContext, useState } from 'react';

export const CartContext = createContext();
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isOwner, setIsOwner] = useState(false);

    return (
        <AuthContext.Provider value={{ isOwner, setIsOwner }}>
            {children}
        </AuthContext.Provider>
    );
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    
    const existingProduct = cart.find((item) => item.product_id === product.product_id);
    if (existingProduct) {
      
      setCart(
        cart.map((item) =>
          item.product_id === product.product_id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.product_id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart(
      cart.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};