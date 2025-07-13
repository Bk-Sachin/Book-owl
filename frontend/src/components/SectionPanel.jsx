import React from "react";
import "../App.css";

const SectionPanel = ({ children, className = "" }) => (
  <section className={`section-panel glass-panel ${className}`}>
    {children}
  </section>
);

export default SectionPanel;
