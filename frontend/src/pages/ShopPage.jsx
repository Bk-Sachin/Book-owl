import React, { useState } from "react";
import "../App.css";
import BookCard from "../components/BookCard";
import "./ShopPage.css";
import { useBooks } from "../BookContext";

const ShopPage = () => {
  const { books } = useBooks();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [sort, setSort] = useState("relevance");

  // Dynamically extract unique categories and authors from books
  const categories = Array.from(new Set(books.map((b) => b.category)));
  const authors = Array.from(new Set(books.map((b) => b.author)));

  // Filter logic
  let filteredBooks = books.filter(
    (b) =>
      (!search ||
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase())) &&
      (!selectedCategory || b.category === selectedCategory) &&
      (!selectedAuthor || b.author === selectedAuthor)
  );

  // Sort logic
  if (sort === "price-low")
    filteredBooks = filteredBooks.sort((a, b) => a.price - b.price);
  else if (sort === "price-high")
    filteredBooks = filteredBooks.sort((a, b) => b.price - a.price);
  else if (sort === "newest")
    filteredBooks = filteredBooks.sort(
      (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
    );
  else if (sort === "bestselling")
    filteredBooks = filteredBooks.sort(
      (a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0)
    );
  else if (sort === "rating")
    filteredBooks = filteredBooks.sort((a, b) => b.rating - a.rating);

  return (
    <main className="main-content mt-5 pt-5">
      <div className="container">
        <h1 className="display-4 fw-bold text-center mb-4 text-primary">
          Shop All Books
        </h1>
        <div className="row gx-5 gy-4">
          {/* Sidebar Filters */}
          <aside className="col-12 col-md-4 col-lg-3 mb-4 mb-md-0">
            <div className="glass-panel rounded-4 shadow p-4 mb-4">
              <h5 className="fw-bold mb-3">Filter By</h5>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Author</label>
                <select
                  className="form-select"
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                >
                  <option value="">All</option>
                  {authors.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </aside>
          {/* Main Content */}
          <section className="col-12 col-md-8 col-lg-9">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-3">
              <input
                className="form-control w-100 w-md-50"
                type="search"
                placeholder="Search books, authors, ISBN..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="d-flex align-items-center gap-2">
                <label className="form-label mb-0">Sort by:</label>
                <select
                  className="form-select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  style={{ minWidth: 150 }}
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="bestselling">Bestselling</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
            <div className="row g-4 justify-content-center">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                    key={book._id || book.id}
                  >
                    <BookCard {...book} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center text-muted">
                  No books found.
                </div>
              )}
            </div>
            {/* Pagination controls (placeholder) */}
            <nav className="d-flex justify-content-center mt-4">
              <ul className="pagination">
                <li className="page-item disabled">
                  <span className="page-link">Previous</span>
                </li>
                <li className="page-item active">
                  <span className="page-link">1</span>
                </li>
                <li className="page-item">
                  <span className="page-link">2</span>
                </li>
                <li className="page-item">
                  <span className="page-link">3</span>
                </li>
                <li className="page-item">
                  <span className="page-link">Next</span>
                </li>
              </ul>
            </nav>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
