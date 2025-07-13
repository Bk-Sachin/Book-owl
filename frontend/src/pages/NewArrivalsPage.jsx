import React from "react";
import "../App.css";
import './NewArrivalsPage.css';

const NewArrivalsPage = () => (
  <main className="main-content mt-5 pt-5">
    <div className="container">
      <h1 className="display-4 fw-bold text-center mb-4 text-primary">New Arrivals</h1>
      <div className="row g-4 justify-content-center">
        {/* New arrivals grid goes here */}
        <div className="col-12 text-center text-muted">(New arrivals coming soon!)</div>
      </div>
    </div>
  </main>
);

export default NewArrivalsPage; 