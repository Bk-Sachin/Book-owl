import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";
import { useCart } from "../CartContext";
import "./Header.css";
import { useRef } from "react";
import logo from "../assets/logo.png";
import logoDark from "../assets/logodark.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Header = ({ theme, toggleTheme, user, setUser }) => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navRef = React.useRef();
  const dropdownRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Hamburger menu state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  const handleDropdown = () => setShowDropdown((prev) => !prev);
  const closeDropdown = () => setShowDropdown(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  // Menu content for mobile
  const mobileMenu = (
    <div
      className={`mobile-menu-dropdown${menuOpen ? " open" : ""}`}
      id="mobile-menu"
    >
      <ul className="mobile-menu-list">
        {navLinks.map((link) => (
          <li key={link.label}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-bold text-primary"
                  : "nav-link fw-semibold text-dark"
              }
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink
            to="/cart"
            className="nav-link d-flex align-items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <i className="bi bi-cart3"></i>
            Cart
            {cartCount > 0 && (
              <span className="badge rounded-pill bg-danger ms-1">
                {cartCount}
              </span>
            )}
          </NavLink>
        </li>
        <li>
          {user ? (
            <>
              <NavLink
                to="/account"
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </NavLink>
              {user.role === "admin" && (
                <NavLink
                  to="/admin"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin Panel
                </NavLink>
              )}
              <button
                className="nav-link btn btn-link text-danger p-0"
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </NavLink>
          )}
        </li>
        <li>
          <button
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
            className="nav-link btn btn-link p-0"
          >
            {theme === "dark" ? (
              <>
                <i className="bi bi-moon-fill"></i> Dark
              </>
            ) : (
              <>
                <i className="bi bi-sun-fill"></i> Light
              </>
            )}
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <nav ref={navRef} className="navbar compact">
      <div
        className="d-flex align-items-center w-100"
        style={{ gap: 16, position: "relative" }}
      >
        <NavLink
          to="/"
          className="navbar-brand fw-bold fs-3 text-primary me-3"
          style={{ letterSpacing: 2 }}
        >
          <img
            src={theme === "dark" ? logoDark : logo}
            alt="Book Owl Logo"
            style={{ height: 50, width: "auto", display: "block" }}
          />
        </NavLink>
        {/* Hamburger icon for mobile only */}
        {isMobile && (
          <button
            className="navbar-hamburger"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            style={{
              background: "none",
              border: "none",
              padding: 8,
              marginRight: 8,
              display: "flex",
              cursor: "pointer",
            }}
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>
        )}
        {/* Desktop nav links and actions */}
        {!isMobile && (
          <>
            <div className="navbar-links" style={{ flex: 1 }}>
              <ul
                className="navbar-nav flex-row gap-3 align-items-center flex-grow-1 justify-content-center mb-0"
                style={{ flex: 1 }}
              >
                {navLinks.map((link) => (
                  <li className="nav-item" key={link.label}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        isActive
                          ? "nav-link active fw-bold text-primary"
                          : "nav-link fw-semibold text-dark"
                      }
                      end={link.to === "/"}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="navbar-actions d-flex align-items-center gap-3 ms-auto">
              <NavLink
                to="/cart"
                className="position-relative text-decoration-none text-dark fs-4"
              >
                <i className="bi bi-cart3"></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </NavLink>
              {user ? (
                <div className="user-dropdown" ref={dropdownRef}>
                  <button
                    className="btn btn-outline-primary fw-semibold"
                    type="button"
                    onClick={handleDropdown}
                    aria-expanded={showDropdown}
                  >
                    {user.name}
                  </button>
                  {showDropdown && (
                    <ul className="dropdown-menu dropdown-menu-end user-dropdown-menu show">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/account"
                          onClick={closeDropdown}
                        >
                          Profile
                        </NavLink>
                      </li>
                      {user.role === "admin" && (
                        <li>
                          <NavLink
                            className="dropdown-item"
                            to="/admin"
                            onClick={closeDropdown}
                          >
                            Admin Panel
                          </NavLink>
                        </li>
                      )}
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => {
                            closeDropdown();
                            handleLogout();
                          }}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink to="/login" className="btn btn-outline-primary btn-sm">
                  Login
                </NavLink>
              )}
              <button
                onClick={toggleTheme}
                className="btn btn-outline-secondary ms-2"
                title="Toggle dark mode"
              >
                {theme === "dark" ? (
                  <i className="bi bi-moon-fill"></i>
                ) : (
                  <i className="bi bi-sun-fill"></i>
                )}
              </button>
            </div>
          </>
        )}
        {/* Mobile menu dropdown */}
        {isMobile && menuOpen && mobileMenu}
      </div>
    </nav>
  );
};

export default Header;
