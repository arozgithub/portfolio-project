import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./navbar.css"; // Import CSS file
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const handleAboutClick = (e) => {
    e.preventDefault(); // Prevent default link behavior

    if (location.pathname === "/") {
      // Already on home page, just scroll to About section
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to home page first, then scroll after rendering
      navigate("/");

      setTimeout(() => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <nav className={`navbar ${darkMode ? "dark" : ""}`}>
      <div className="logo">My Portfolio</div>
      <ul className="nav-links">
        <li><Link to="/" className="nav-button">Home</Link></li>
        <li><Link to="/portfolio" className="nav-button">Portfolio</Link></li>
        <li><Link to="/data-entry" className="nav-button">Create Portfolio</Link></li>
        <li><Link to="/contact" className="nav-button">Contact</Link></li>
        <li><Link onClick={handleAboutClick} className="nav-button">About</Link></li>
        <li><Link to="/projects" className="nav-button">Projects</Link></li>
        {/* <li><Link to="/upload" className="nav-button">Upload</Link></li> */}
        <li><Link to="/resume" className="nav-button">Resume</Link></li>
      </ul>

      <DarkModeToggle />
    </nav>
  );
};

export default Navbar;
