import React from "react";
import "../App.css";
import { useCart } from "../CartContext";
import { useBooks } from "../BookContext";
import './CartPage.css';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { books } = useBooks();

  const cartDetails = cartItems.map(item => {
    const book = books.find(b => b._id === item.bookId);
    return book ? { ...book, quantity: item.quantity, bookId: item.bookId } : null;
  }).filter(Boolean);

  const subtotal = cartDetails.reduce((sum, b) => sum + (b.price || 0) * b.quantity, 0);

  return (
    <main className="main-content mt-5 pt-5">
      <div className="container">
        <h1 className="display-4 fw-bold text-center mb-4 text-primary">Your Cart</h1>
        {cartDetails.length === 0 ? (
          <div className="alert alert-info text-center">Your cart is empty.</div>
        ) : (
          <>
            <div className="table-responsive mb-4">
              <table className="table align-middle bg-white rounded-4 shadow" style={{ tableLayout: 'fixed' }}>
                <thead>
                  <tr>
                    <th style={{ width: 70 }}></th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Price</th>
                    <th style={{ minWidth: 140, width: 160 }}>Quantity</th>
                    <th>Total</th>
                    <th style={{ width: 60 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {cartDetails.map(book => (
                    <tr key={book.bookId}>
                      <td><img src={book.cover} alt={book.title} style={{ width: 60, height: 80, objectFit: 'cover', borderRadius: 8 }} /></td>
                      <td className="fw-bold">{book.title}</td>
                      <td>{book.author}</td>
                      <td>NRS {typeof book.price === 'number' ? book.price.toFixed(2) : '-'}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2 justify-content-center">
                          <button className="btn btn-outline-secondary btn-sm px-2" style={{ minWidth: 32 }} onClick={() => updateQuantity(book.bookId, book.quantity - 1)} disabled={book.quantity <= 1}>-</button>
                          <input type="number" min={1} value={book.quantity} onChange={e => updateQuantity(book.bookId, Number(e.target.value))} className="form-control form-control-sm text-center" style={{ width: 60, minWidth: 60, textAlign: 'center' }} />
                          <button className="btn btn-outline-secondary btn-sm px-2" style={{ minWidth: 32 }} onClick={() => updateQuantity(book.bookId, book.quantity + 1)}>+</button>
                        </div>
                      </td>
                      <td className="fw-bold">NRS {typeof book.price === 'number' ? (book.price * book.quantity).toFixed(2) : '-'}</td>
                      <td>
                        <button className="btn btn-danger btn-sm rounded-pill" onClick={() => removeFromCart(book.bookId)} title="Remove">
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-4">
              <div className="fs-4 fw-bold">Subtotal: NRS {subtotal.toFixed(2)}</div>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-danger" onClick={clearCart}><i className="bi bi-x-circle me-1"></i>Clear Cart</button>
                <button className="btn btn-success"><i className="bi bi-credit-card me-1"></i>Checkout</button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default CartPage; 