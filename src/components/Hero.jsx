import React from "react";
import "./Hero.css"; 
import socialImage from "../components/social.jpg";  // Corrected path
import profilePic from "../components/formal.jpg";   // Corrected path
import AboutMe from "./AboutMe";

const Hero = () => {
  return (
    <header className="hero">
      <img src={socialImage} alt="Aroz Imran" className="hero-image" />

      <div className="hero-content">
        <h1>Portfolio</h1>

        <div className="quote">
          <p>
            "When I am working on a problem, I never think about beauty,
            but when I have finished, if the solution is not beautiful,
            I know it is wrong."
          </p>
          <span>— Steve Jobs</span>
        </div>

        <div className="black-box">
          <h2>Aroz Imran</h2>
          <h4>Hello, this is Aroz</h4>
          <p>I am a passionate Data Scientist and ML/AI Expert.</p>
        </div>

        {/* About Me Section Inside Hero */}
        <AboutMe 
          profilePic={profilePic}  
          name="Aroz Imran"
          bio="I am a passionate Data Scientist and ML/AI Expert."
          skills={["Python", "ML", "React", "AWS"]}
        />
      </div>
    </header>
  );
};

export default Hero;
