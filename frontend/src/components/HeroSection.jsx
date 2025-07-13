import React from "react";
import "../App.css";
import "./HeroSection.css";

const HeroSection = ({ onCTAClick }) => (
  <section className="hero-section d-flex align-items-center justify-content-center flex-column text-center py-5">
    <div className="container py-5">
      <h1 className="display-2 fw-bold mb-3">
        Discover Your Next Favorite Book
      </h1>
      <p className="lead mb-4">
        Curated collections, exclusive deals, and lightning-fast delivery. Dive
        into a world of stories!
      </p>
      <button
        className="btn btn-lg btn-primary px-5 shadow"
        onClick={onCTAClick}
      >
        Browse Collection
      </button>
      <div className="mt-5 d-flex justify-content-center">
        <svg
          width="320"
          height="180"
          viewBox="0 0 320 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="160"
            cy="150"
            rx="120"
            ry="20"
            fill="var(--accent-bg)"
            fillOpacity="0.15"
          />
          <rect
            x="60"
            y="40"
            width="200"
            height="100"
            rx="20"
            fill="var(--glass-bg)"
            stroke="var(--accent-bg)"
            strokeWidth="4"
          />
          <rect
            x="90"
            y="60"
            width="60"
            height="60"
            rx="10"
            fill="var(--btn-bg)"
          />
          <rect
            x="170"
            y="60"
            width="60"
            height="60"
            rx="10"
            fill="var(--btn-bg-hover)"
          />
        </svg>
      </div>
    </div>
  </section>
);

export default HeroSection;
