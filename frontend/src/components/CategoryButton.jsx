import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import './CategoryButton.css';

const CategoryButton = ({ icon, label }) => {
  const navigate = useNavigate();
  return (
    <button
      className="category-btn glass-panel"
      onClick={() => navigate(`/category/${encodeURIComponent(label)}`)}
    >
      <span className="category-icon">{icon}</span>
      <span className="category-label">{label}</span>
    </button>
  );
};

export default CategoryButton; 