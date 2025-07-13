import React, { useState } from "react";
import "./BookCard.css";
import { useCart } from "../CartContext.jsx";
import { Link } from "react-router-dom";

const fallbackCover = "https://via.placeholder.com/160x240?text=No+Cover";

function BookCard({ _id, cover, title, author, rating, price, stock, category }) {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const inCart = cartItems.some(item => item.bookId === _id);
  const [imgSrc, setImgSrc] = useState(cover);

  const handleAddToCart = () => {
    if (stock > 0) {
      addToCart(_id);
    }
  };

  return (
    <div className="book-card glass-panel rounded-4 shadow p-3 h-100 d-flex flex-column align-items-center">
      <Link to={`/product/${_id}`} className="bookcard-link">
        <div className="bookcard-img-container">
          <img
            src={imgSrc}
            alt={title}
            className="bookcard-img"
            onError={() => setImgSrc(fallbackCover)}
          />
        </div>
        <h5 className="fw-bold mb-1 text-center min-height-48">{title}</h5>
        <div className="mb-1 text-muted small text-center">{author}</div>
        {category && <div className="badge bg-secondary mb-2">{category}</div>}
      </Link>
      <p className="mb-1 text-muted small">In Stock: {stock > 0 ? stock : <span className="text-danger">Out of Stock</span>}</p>
      <div className="mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < rating ? "star filled" : "star"}>
          </span>
        ))}
      </div>
      {typeof price === "number" ? (
        <div className="mb-2 fw-bold">NRS {price.toFixed(2)}</div>
      ) : null}
      <div className="d-flex flex-column gap-2 w-100 mt-auto">
        {!inCart ? (
          <button
            className="btn btn-primary w-100 mt-2"
            disabled={stock === 0}
            onClick={handleAddToCart}
          >
            {stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        ) : (
          <>
            <button
              className="btn btn-secondary btn-lg rounded-pill shadow-sm fw-bold w-100 mb-1"
              disabled
            >
              <i className="bi bi-cart-check me-2"></i>In Cart
            </button>
            <button
              className="btn btn-danger btn-sm rounded-pill fw-bold w-100"
              onClick={() => removeFromCart(_id)}
            >
              <i className="bi bi-trash me-1"></i>Remove
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default BookCard; 