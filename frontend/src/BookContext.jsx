import React, { createContext, useContext, useState, useEffect } from "react";
import * as bookApi from "./api/books";

const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    bookApi.getBooks()
      .then(setBooks)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const addBook = async (book) => {
    const newBook = await bookApi.addBook(book);
    setBooks(prev => [...prev, newBook]);
  };
  const updateBook = async (id, updated) => {
    const updatedBook = await bookApi.updateBook(id, updated);
    setBooks(prev => prev.map(b => b._id === id ? updatedBook : b));
  };
  const removeBook = async (id) => {
    await bookApi.deleteBook(id);
    setBooks(prev => prev.filter(b => b._id !== id));
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, removeBook, loading, error }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error("useBooks must be used within a BookProvider");
  return ctx;
} 