import React, { useState } from "react";
import "./Contact.css"; // Make sure this file is updated as shown below

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmitted(true);

    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });

    // Hide success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2 className="contact-title" >📩 Contact Me</h2>
        
        {submitted && <div className="success-message">✅ Message sent successfully!</div>}
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="contact-input"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="contact-input"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="contact-input"
            required
          ></textarea>
          <button type="submit" className="contact-button">🚀 Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
