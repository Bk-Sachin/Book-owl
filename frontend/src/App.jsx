import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BookCard from "./components/BookCard";
import CategoryButton from "./components/CategoryButton";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AccountPage from "./pages/AccountPage";
import AdminPage from "./pages/AdminPage";
import { BookProvider, useBooks } from "./BookContext";
import { CartProvider } from "./CartContext";
import LoginPage from "./pages/LoginPage";

const categories = [
  { icon: "📖", label: "Literary fiction" },
  { icon: "🧙‍♂️", label: "Fantasy romance" },
  { icon: "🏺", label: "Literary/historical fiction" },
  { icon: "🚀", label: "Literary sci-fi/dystopian" },
  { icon: "🧠", label: "Psychological thriller" },
  { icon: "🔪", label: "Crime fiction" },
  { icon: "🧛", label: "Fantasy (vampire)" },
  { icon: "🧩", label: "Literary mystery" },
  { icon: "🌳", label: "Literary fiction/environment" },
];

function HomePage({ theme }) {
  const { books, loading, error } = useBooks();
  const handleCTAClick = () => {
    const features = document.getElementById("features-section");
    if (features) features.scrollIntoView({ behavior: "smooth" });
  };

  // Example: pick first 4 as "bestsellers" and next 4 as "new arrivals"
  const bestsellers = books.slice(0, 4);
  const newArrivals = books.slice(4, 8);

  return (
    <main className="main-content mt-5 pt-5">
      <HeroSection onCTAClick={handleCTAClick} />
      <div id="features-section">
        <FeaturesSection />
      </div>
      <div className="container">
        <div className="card shadow-lg rounded-4 p-5 mb-5 text-center bg-light border-0">
          <h1 className="display-4 fw-bold mb-3 text-primary">
            Find your next favorite book.
          </h1>
          <button className="btn btn-lg btn-primary px-5">
            Browse Collection
          </button>
        </div>
        {/* Bestsellers Section */}
        <section className="mb-5">
          <h2 className="h3 fw-bold mb-4 text-secondary">Bestsellers</h2>
          <div className="row g-4">
            {loading && <div>Loading...</div>}
            {error && <div className="text-danger">{error}</div>}
            {!loading &&
              !error &&
              bestsellers.map((book) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                  key={book._id}
                >
                  <BookCard {...book} />
                </div>
              ))}
          </div>
        </section>
        {/* Categories Section */}
        <section className="mb-5">
          <h2 className="h3 fw-bold mb-4 text-secondary">Categories</h2>
          <div className="row g-3 justify-content-center">
            {categories.map((cat, i) => (
              <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={cat.label}>
                <CategoryButton icon={cat.icon} label={cat.label} />
              </div>
            ))}
          </div>
        </section>
        {/* New Arrivals Section */}
        <section className="mb-5">
          <h2 className="h3 fw-bold mb-4 text-secondary">New Arrivals</h2>
          <div className="row g-4">
            {loading && <div>Loading...</div>}
            {error && <div className="text-danger">{error}</div>}
            {!loading &&
              !error &&
              newArrivals.map((book) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                  key={book._id}
                >
                  <BookCard {...book} />
                </div>
              ))}
          </div>
        </section>
        {/* Deals Section */}
        <section className="mb-5">
          <h2 className="h3 fw-bold mb-4 text-secondary">Deals & Offers</h2>
          <div className="row g-4">
            {/* Placeholder for deals/offers */}
            <div className="col-12 text-center text-muted">
              (Deals and offers coming soon!)
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function getUser() {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user) return null;
    // Decode JWT payload
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
      // Token expired
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return null;
    }
    return user;
  } catch {
    return null;
  }
}

function App() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(getUser());
  useEffect(() => {
    document.body.classList.toggle("dark-theme", theme === "dark");
  }, [theme]);
  // Watch for token/user changes in localStorage
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (!token || !user) {
        setUser(null);
      } else {
        setUser(JSON.parse(user));
      }
    };
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  // Protect admin, account, cart routes
  const isLoggedIn = !!user;
  const isAdmin = user && user.role === "admin";

  return (
    <BookProvider>
      <CartProvider>
        <Router>
          <div className="bookstore-bg">
            <Header
              theme={theme}
              toggleTheme={toggleTheme}
              user={user}
              setUser={setUser}
            />
            <Routes>
              <Route path="/" element={<HomePage theme={theme} />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/account"
                element={isLoggedIn ? <AccountPage /> : <LoginPage />}
              />
              <Route
                path="/admin"
                element={isAdmin ? <AdminPage /> : <LoginPage />}
              />
              <Route
                path="/product/:id"
                element={<ProductDetails theme={theme} />}
              />
              <Route
                path="/cart"
                element={
                  isLoggedIn ? <CartPage theme={theme} /> : <LoginPage />
                }
              />
              <Route
                path="/category/:category"
                element={<CategoryPage theme={theme} />}
              />
            </Routes>
            <footer className="footer bg-light text-center py-3 mt-5 border-top">
              © 2025 Book-owl. All rights reserved.
            </footer>
          </div>
        </Router>
      </CartProvider>
    </BookProvider>
  );
}

export default App;
