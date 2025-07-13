import React, { createContext, useContext, useState, useEffect } from "react";
import * as cartApi from "./api/cart";
import { useBooks } from "./BookContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { books } = useBooks();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    if (user) {
      cartApi
        .getCart()
        .then((cart) => setCartItems(cart.items || []))
        .catch(() => setCartItems([]))
        .finally(() => setLoading(false));
    } else {
      setCartItems([]);
      setLoading(false);
    }
  }, [userString]);

  const syncCart = async (items) => {
    await cartApi.addOrUpdateCart(items);
    setCartItems(items);
  };

  const addToCart = async (bookId) => {
    const book = books.find((b) => b._id === bookId);
    if (!book || book.stock === 0) return;
    const found = cartItems.find((item) => item.bookId === bookId);
    let newItems;
    if (found) {
      if (found.quantity < book.stock) {
        newItems = cartItems.map((item) =>
          item.bookId === bookId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return;
      }
    } else {
      newItems = [...cartItems, { bookId, title: book.title, quantity: 1 }];
    }
    await syncCart(newItems);
  };

  const removeFromCart = async (bookId) => {
    const newItems = cartItems.filter((item) => item.bookId !== bookId);
    if (newItems.length === 0) {
      await cartApi.clearCart();
      setCartItems([]);
    } else {
      await syncCart(newItems);
    }
  };

  const updateQuantity = async (bookId, quantity) => {
    const book = books.find((b) => b._id === bookId);
    if (!book) return;
    const newItems = cartItems.map((item) => {
      if (item.bookId === bookId) {
        const newQuantity = Math.max(1, Math.min(quantity, book.stock));
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    await syncCart(newItems);
  };

  const clearCart = async () => {
    await cartApi.clearCart();
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        loading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
