import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find((item) => item.data.id === product.data.id);

    if (existingItem) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      updateQuantity(product.data.id, existingItem.quantity + quantity);
    } else {
      // Agrega un nuevo producto al carrito
      setCartItems((prevItems) => [...prevItems, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.data.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.data.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
