import React from "react";
import "../App.css";
import './FeaturesSection.css';

const features = [
  {
    icon: "🚚",
    title: "Free & Fast Delivery",
    desc: "Get your books delivered to your doorstep in record time, at no extra cost!",
  },
  {
    icon: "🔒",
    title: "Secure Checkout",
    desc: "Your payment and personal info are always protected with industry-leading security.",
  },
  {
    icon: "🌟",
    title: "Bestseller Picks",
    desc: "Browse our handpicked bestsellers and trending titles, updated daily.",
  },
  {
    icon: "💬",
    title: "24/7 Support",
    desc: "Our friendly team is here to help you anytime, anywhere.",
  },
  {
    icon: "🎁",
    title: "Exclusive Deals",
    desc: "Unlock special offers and discounts available only to our members.",
  },
  {
    icon: "📚",
    title: "Curated Collections",
    desc: "Discover books tailored to your interests and reading style.",
  },
];

const FeaturesSection = () => (
  <section className="features-section py-5 bg-transparent">
    <div className="container">
      <h2 className="display-5 fw-bold mb-4 text-center">
        Why Shop With Us?
      </h2>
      <div className="row g-4 justify-content-center">
        {features.map((f, i) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-4" key={i}>
            <div className="feature-card p-4 rounded-4 shadow text-center h-100">
              <div className="display-3 mb-3">{f.icon}</div>
              <h5 className="fw-bold mb-2">{f.title}</h5>
              <p className="mb-0">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection; 