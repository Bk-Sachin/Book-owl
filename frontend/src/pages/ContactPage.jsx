import React from "react";
import "../App.css";

const ContactPage = () => (
  <main className="main-content mt-5 pt-5">
    <div className="container">
      <h1 className="display-4 fw-bold text-center mb-4 text-primary">
        Contact Us
      </h1>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <form className="p-4 glass-panel rounded-4 shadow mb-4">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Your name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="your@email.com"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                rows={4}
                placeholder="How can we help?"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Send Message
            </button>
          </form>
          <div className="text-center text-muted">
            Or email us at{" "}
            <a href="mailto:book-owl@example.com">book-owl@example.com</a>
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default ContactPage;
