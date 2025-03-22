import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import DataEntry from "./pages/DataEntry";
import DarkModeToggle from "./components/DarkModeToggle";
import Contact from "./components/Contact";
import "./project.css";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import "./styles.css";
import Portfolio from "./pages/Portfolio";
import Hero from "./components/Hero";
import Footer from "./components/Footer"; // Import Footer
import AboutMe from "./components/AboutMe";
import profilePic from "./components/formal.jpg";
import Upload from "./components/Upload";
import ScrollToSection from "./components/scrolltosection"; // 
import ResumeUploader from "./components/resume";
const App = () => {
  const [userData, setUserData] = useState(() => {
    return JSON.parse(localStorage.getItem("portfolioData")) || {};
  });

  // Sync user data with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("portfolioData", JSON.stringify(userData));
  }, [userData]);

  return (
    <div className="container mx-auto p-6 text-center dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* <ScrollToSection /> */}

    <Navbar/>


      {/* Routes */}
      <Routes>
  <Route path="/" element={<Hero />} />
  <Route path="/data-entry" element={<DataEntry setUserData={setUserData} />} />
  <Route path="/portfolio" element={<Portfolio userData={userData} />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/about" element={<AboutMe />} />
  <Route path="/projects" element={<Projects projects={userData.projects || []} />} />
  {/* <Route path="/upload" element={<Upload />} /> */}
  <Route path="/resume" element={<ResumeUploader />} />

</Routes>

<Footer />

    </div>
  );
};

export default App;
