import React from "react";
import Projects from "../components/Projects"; // Import Projects component
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import "./portfolio.css";

const Portfolio = ({ userData }) => {
  // Map social media names to icons
  const getSocialMediaIcon = (name) => {
    switch (name.toLowerCase()) {
      case "twitter":
        return <FaTwitter />;
      case "facebook":
        return <FaFacebook />;
      case "linkedin":
        return <FaLinkedin />;
      case "instagram":
        return <FaInstagram />;
      case "github":
        return <FaGithub />;
      default:
        return <span>{name}</span>;
    }
  };

  return (
    <div className="portfolio-container">
      <h2>Portfolio</h2>
      <div className="portfolio-details">
        {userData?.name && (
          <>
            <h3>Name</h3>
            <p>{userData.name}</p>
          </>
        )}
        {userData?.bio && (
          <>
            <h3>Bio</h3>
            <p>{userData.bio}</p>
          </>
        )}
        {userData?.aboutMe && (
          <>
            <h3>About Me</h3>
            <p>{userData.aboutMe}</p>
          </>
        )}
        {userData?.skills && (
          <>
            <h3>Skills</h3>
            <p>{userData.skills}</p>
          </>
        )}
        {userData?.socialMedia && userData.socialMedia.length > 0 && (
          <>
            <h3>Social Media</h3>
            <div className="social-media-icons">
              {userData.socialMedia.map((sm, index) => (
                <a
                  key={index}
                  href={sm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-media-link"
                  title={sm.name}
                >
                  {getSocialMediaIcon(sm.name)}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
      {/* Render Projects section */}
      <Projects userProjects={userData?.projects || []} />
    </div>
  );
};

export default Portfolio;
