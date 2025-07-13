import React from "react";
import { useParams, Link } from "react-router-dom";
import { useBooks } from "../BookContext";
import { useCart } from "../CartContext";
import "../App.css";
import './ProductDetails.css';

const ProductDetails = ({ theme }) => {
  const { id } = useParams();
  const { books } = useBooks();
  const { addToCart, cartItems } = useCart();
  const book = books.find(b => b._id === id || b.id === id);
  const inCart = cartItems.some(item => item.id === id);

  if (!book) {
    return (
      <main className="main-content mt-5 pt-5">
        <div className="container text-center py-5">
          <h2 className="text-danger">Book Not Found</h2>
          <Link to="/shop" className="btn btn-primary mt-3">Back to Shop</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content mt-5 pt-5">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card shadow-lg rounded-4 p-4 mb-4">
              <div className="row g-4 align-items-center">
                <div className="col-md-5 text-center">
                  <img src={book.cover} alt={book.title} className="img-fluid rounded-3 mb-3" />
                </div>
                <div className="col-md-7">
                  <h1 className="h2 fw-bold text-primary mb-2">{book.title}</h1>
                  <div className="text-secondary mb-2">{book.author}</div>
                  <div className="mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < book.rating ? "star filled text-warning" : "star text-muted"}>★</span>
                    ))}
                  </div>
                  <div className="h5 text-success mb-3">${book.price.toFixed(2)}</div>
                  <div className="mb-2"><span className="fw-bold">Category:</span> {book.category}</div>
                  <div className="mb-2"><span className="fw-bold">Stock:</span> {book.stock > 0 ? book.stock : <span className='text-danger'>Out of Stock</span>}</div>
                  <p className="mb-3">{book.description}</p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary" disabled={book.stock === 0 || inCart} onClick={() => addToCart(book.id)}>
                      {book.stock === 0 ? 'Out of Stock' : inCart ? 'In Cart' : 'Add to Cart'}
                    </button>
                    <Link to="/shop" className="btn btn-outline-secondary">Back to Shop</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails; 