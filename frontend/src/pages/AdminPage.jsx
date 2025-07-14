import React, { useState } from "react";
import "../App.css";
import { useBooks } from "../BookContext";
import "./AdminPage.css";
import axios from "axios";

const initialForm = {
  title: "",
  author: "",
  price: "",
  cover: "",
  category: "",
  rating: 0,
  isBestseller: false,
  isNew: false,
  isDeal: false,
  stock: "",
  description: "",
};

const CATEGORY_OPTIONS = [
  "Literary fiction",
  "Fantasy romance",
  "Literary/historical fiction",
  "Literary sci-fi/dystopian",
  "Psychological thriller",
  "Crime fiction",
  "Fantasy (vampire)",
  "Literary mystery",
  "Literary fiction/environment",
];

const AdminPage = () => {
  const { books, addBook, updateBook, removeBook } = useBooks();
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [coverType, setCoverType] = useState('url'); // 'url' or 'upload'
  const [coverFile, setCoverFile] = useState(null);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add or update book
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Validation
    if (
      !form.title ||
      !form.author ||
      !form.price ||
      (!form.cover && !coverFile) ||
      !form.category ||
      form.stock === ""
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (isNaN(Number(form.price)) || Number(form.price) < 0) {
      setError("Price must be a non-negative number.");
      return;
    }
    if (
      isNaN(Number(form.rating)) ||
      Number(form.rating) < 0 ||
      Number(form.rating) > 5
    ) {
      setError("Rating must be between 0 and 5.");
      return;
    }
    if (isNaN(Number(form.stock)) || Number(form.stock) < 0) {
      setError("Stock must be a non-negative integer.");
      return;
    }
    const payload = {
      ...form,
      price: Number(form.price),
      rating: Number(form.rating),
      stock: Number(form.stock),
    };
    try {
      if (editingId) {
        await updateBook(editingId, payload);
        setSuccess("Book updated successfully.");
      } else {
        if (coverType === 'upload' && coverFile) {
          // Use addBook with coverFile
          await addBook({ ...payload, coverFile });
        } else {
          await addBook(payload);
        }
        setSuccess("Book added successfully.");
      }
      setForm(initialForm);
      setCoverFile(null);
      setEditingId(null);
    } catch (err) {
      setError(err.message || "Error saving book.");
    }
  };

  // Edit book
  const handleEdit = (book) => {
    setForm({
      ...book,
      price: book.price?.toString() || "",
      rating: book.rating?.toString() || "",
      stock: book.stock !== undefined ? book.stock.toString() : "",
    });
    setEditingId(book._id);
    setError("");
    setSuccess("");
  };

  // Delete book
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await removeBook(id);
      setSuccess("Book deleted.");
      setError("");
      setForm(initialForm);
      setEditingId(null);
    } catch (err) {
      setError(err.message || "Error deleting book.");
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
    setError("");
    setSuccess("");
  };

  // Filter books by search
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.category.toLowerCase().includes(search.toLowerCase())
  );

  // Handle file upload (just set file in state, upload on submit)
  const handleFileChange = (e) => {
    setCoverFile(e.target.files[0] || null);
    setForm(f => ({ ...f, cover: "" })); // clear URL if file selected
  };

  return (
    <main className="main-content mt-5 pt-5">
      <div className="container">
        <h1 className="display-4 fw-bold text-center mb-4 text-primary">
          Admin Panel
        </h1>
        <div className="row g-4">
          <div className="col-12 col-lg-4">
            <div className="glass-panel rounded-4 shadow p-4 mb-4">
              <h4 className="fw-bold mb-3">
                {editingId ? "Edit Book" : "Add New Book"}
              </h4>
              {error && <div className="alert alert-danger py-2">{error}</div>}
              {success && (
                <div className="alert alert-success py-2">{success}</div>
              )}
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="mb-2">
                  <label className="form-label">Title *</label>
                  <input
                    className="form-control"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Author *</label>
                  <input
                    className="form-control"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Price *</label>
                  <div className="input-group">
                    <span className="input-group-text">NRS</span>
                    <input
                      className="form-control"
                      name="price"
                      type="number"
                      min={0}
                      step={0.01}
                      value={form.price}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 500"
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <label className="form-label">Cover Image *</label>
                  <div className="mb-2 d-flex gap-3">
                    <label>
                      <input
                        type="radio"
                        name="coverType"
                        value="url"
                        checked={coverType === 'url'}
                        onChange={() => { setCoverType('url'); setCoverFile(null); }}
                      />
                      <span className="ms-1">Image URL</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="coverType"
                        value="upload"
                        checked={coverType === 'upload'}
                        onChange={() => { setCoverType('upload'); setForm(f => ({ ...f, cover: "" })); }}
                      />
                      <span className="ms-1">Upload Image</span>
                    </label>
                  </div>
                  {coverType === 'url' && (
                    <input
                      className="form-control mb-2"
                      name="cover"
                      value={form.cover}
                      onChange={handleChange}
                      placeholder="Paste image URL"
                      required={coverType === 'url'}
                      disabled={coverType !== 'url'}
                    />
                  )}
                  {coverType === 'upload' && (
                    <input
                      className="form-control"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required={coverType === 'upload'}
                      disabled={coverType !== 'upload'}
                    />
                  )}
                  {(form.cover || coverFile) && (
                    <div className="mt-2 text-center">
                      <img
                        src={coverType === 'url' ? form.cover : coverFile ? URL.createObjectURL(coverFile) : ''}
                        alt="Preview"
                        className="img-fluid"
                        style={{
                          maxWidth: 100,
                          maxHeight: 140,
                          borderRadius: 8,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        }}
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    </div>
                  )}
                </div>
                <div className="mb-2">
                  <label className="form-label">Description *</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Enter a brief description of the book"
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-control"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Stock *</label>
                  <input
                    className="form-control"
                    name="stock"
                    type="number"
                    min={0}
                    step={1}
                    value={form.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Rating</label>
                  <input
                    className="form-control"
                    name="rating"
                    type="number"
                    min={0}
                    max={5}
                    value={form.rating}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2 d-flex gap-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="isBestseller"
                      checked={form.isBestseller}
                      onChange={handleChange}
                      id="bestseller"
                    />
                    <label className="form-check-label" htmlFor="bestseller">
                      Bestseller
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="isNew"
                      checked={form.isNew}
                      onChange={handleChange}
                      id="new"
                    />
                    <label className="form-check-label" htmlFor="new">
                      New
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="isDeal"
                      checked={form.isDeal}
                      onChange={handleChange}
                      id="deal"
                    />
                    <label className="form-check-label" htmlFor="deal">
                      Deal
                    </label>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-3">
                  <button
                    className="btn btn-primary fw-bold px-4"
                    type="submit"
                  >
                    {editingId ? "Update" : "Add"}
                  </button>
                  {editingId && (
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <div className="glass-panel rounded-4 shadow p-4 mb-4">
              <h4 className="fw-bold mb-3">All Books</h4>
              <div className="mb-3">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search by title, author, or category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="table-responsive">
                <table
                  className="table table-sm align-middle"
                  style={{ fontSize: "0.97rem" }}
                >
                  <thead>
                    <tr>
                      <th>Cover</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Stock</th>
                      <th>Flags</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBooks.map((book) => (
                      <tr key={book._id}>
                        <td>
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="img-fluid"
                            style={{
                              width: 50,
                              height: 70,
                              objectFit: "cover",
                              borderRadius: 6,
                            }}
                          />
                        </td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>
                          NRS{" "}
                          {typeof book.price === "number"
                            ? book.price.toFixed(2)
                            : "-"}
                        </td>
                        <td>{book.category}</td>
                        <td>{book.stock}</td>
                        <td>
                          {book.isBestseller && (
                            <span className="badge bg-warning text-dark me-1">
                              Bestseller
                            </span>
                          )}
                          {book.isNew && (
                            <span className="badge bg-info text-dark me-1">
                              New
                            </span>
                          )}
                          {book.isDeal && (
                            <span className="badge bg-success">Deal</span>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(book)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(book._id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
