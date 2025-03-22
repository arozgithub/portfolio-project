import React from "react";
import "./Footer.css"; // Ensure CSS file is linked
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa"; // Import icons

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Aroz Imran. All rights reserved.</p>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/aroz-imran-5828b024b/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://github.com/arozgithub" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
