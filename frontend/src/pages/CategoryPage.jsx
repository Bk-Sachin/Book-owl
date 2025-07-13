import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import "../App.css";
import { useBooks } from "../BookContext";
import './CategoryPage.css';

const categories = [
  { icon: "📖", label: "Fiction" },
  { icon: "🕵️‍♂️", label: "Mystery" },
  { icon: "🧙‍♂️", label: "Fantasy" },
  { icon: "💜", label: "Romance" },
  { icon: "🚀", label: "Science Fiction" },
  { icon: "🏺", label: "History" },
  { icon: "📚", label: "Column" },
];

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { books } = useBooks();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category]);

  const filteredBooks = books.filter(
    b => b.category && b.category.trim().toLowerCase() === category.trim().toLowerCase()
  );
  return (
    <main className="main-content mt-5 pt-5">
      <div className="container">
        <h1 className="h2 fw-bold text-center mb-4 text-primary">Browse by Category</h1>
        <div className="row g-2 justify-content-center mb-5">
          {Array.from(new Set(books.map(b => b.category))).map(cat => (
            <div className="col-auto" key={cat}>
              <button
                className={`category-btn glass-panel px-3 py-2 ${category.toLowerCase() === cat.toLowerCase() ? 'active border border-primary' : ''}`}
                onClick={() => navigate(`/category/${encodeURIComponent(cat)}`)}
              >
                <span className="category-label">{cat}</span>
              </button>
            </div>
          ))}
        </div>
        <h2 className="h3 fw-bold text-center mb-4 text-secondary">{category} Books</h2>
        <div className="row g-4 justify-content-center">
          {filteredBooks.length > 0 ? filteredBooks.map((book) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={book.id}>
              <BookCard {...book} />
            </div>
          )) : (
            <div className="col-12 text-center text-muted">No books found in this category.</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CategoryPage; 