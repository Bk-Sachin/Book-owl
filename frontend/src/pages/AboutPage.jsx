import React from "react";
import "../App.css";
import "./AboutPage.css";

const AboutPage = () => (
  <main className="main-content mt-5 pt-5">
    <div className="container">
      <h1 className="display-4 fw-bold text-center mb-4 text-primary">
        About Us
      </h1>
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          <p className="lead mb-4">
            Welcome to Book-owl the best Bookstore! Our mission is to connect
            readers with stories that inspire, entertain, and educate. We
            believe in the power of books to change lives and build community.
          </p>
          <div className="text-muted">
            (More about our team and story coming soon!)
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default AboutPage;
