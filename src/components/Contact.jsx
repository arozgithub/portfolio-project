import React, { useState } from "react";
import emailjs from "emailjs-com"; // Ensure emailjs-com is installed
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_1yhi7ev",       // Your EmailJS service ID
        "template_w5w6248",      // Your EmailJS template ID
        formData,                // The data to fill your template
        "6y42L0-4EJFsO5Ftx"      // Your EmailJS public key
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setSubmitted(true);
          setFormData({ name: "", email: "", message: "" });
          // Hide the success message after 3 seconds
          setTimeout(() => setSubmitted(false), 3000);
        },
        (err) => {
          console.error("FAILED...", err);
        }
      );
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2 className="contact-title">📩 Contact Me</h2>
        {submitted && (
          <div className="submit-message">
            ✅ Message sent successfully!
          </div>
        )}
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
          <button type="submit" className="contact-button">
            🚀 Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
