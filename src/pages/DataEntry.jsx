import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DataEntry.css";

const DataEntry = ({ setUserData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    aboutMe: "",
    skills: "",
    projects: JSON.parse(localStorage.getItem("userProjects")) || [],
    githubRepo: "",
    socialMedia: [] // Holds multiple social media entries
  });

  // Generic input change for top-level fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add an empty project
  const addProject = () => {
    setFormData((prevState) => ({
      ...prevState,
      projects: [
        ...prevState.projects,
        { title: "", description: "", image: "", github: "" }
      ],
    }));
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData((prev) => ({ ...prev, projects: updatedProjects }));
  };

  // Fetch GitHub repo and add as a project
  const fetchGitHubRepo = async () => {
    const repoUrl = formData.githubRepo.trim();
    if (!repoUrl) return;
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      alert("Invalid GitHub repo URL. Please provide a valid repository link.");
      return;
    }
    const [, owner, repo] = match;
    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      if (!response.ok) throw new Error("Repository not found");
      const data = await response.json();
      const newProject = {
        id: data.id.toString(),
        title: data.name,
        description: data.description || "No description available",
        github: data.html_url,
        image: `https://opengraph.githubassets.com/1/${owner}/${repo}`,
      };
      setFormData((prevState) => ({
        ...prevState,
        projects: [...prevState.projects, newProject],
        githubRepo: "",
      }));
    } catch (error) {
      console.error("Error fetching repository:", error);
      alert("Could not fetch repository details. Check the URL and try again.");
    }
  };

  // Social Media Functions

  // Append an empty social media entry
  const addSocialMediaEntry = () => {
    setFormData((prevState) => ({
      ...prevState,
      socialMedia: [...prevState.socialMedia, { name: "", url: "" }],
    }));
  };

  // Update a specific social media entry field
  const handleSocialMediaChange = (index, field, value) => {
    const updatedSocialMedia = [...formData.socialMedia];
    updatedSocialMedia[index][field] = value;
    setFormData((prevState) => ({
      ...prevState,
      socialMedia: updatedSocialMedia,
    }));
  };

  // On submit, save all the data (including all social media entries)
  const handleSubmit = () => {
    setUserData((prevUserData = {}) => {
      const updatedData = {
        ...prevUserData,
        name: formData.name || prevUserData.name || "",
        bio: formData.bio || prevUserData.bio || "",
        aboutMe: formData.aboutMe || prevUserData.aboutMe || "",
        skills: formData.skills || prevUserData.skills || "",
        projects:
          formData.projects.length > 0
            ? formData.projects
            : prevUserData.projects || [],
        socialMedia:
          formData.socialMedia.length > 0
            ? formData.socialMedia
            : prevUserData.socialMedia || [],
      };
      localStorage.setItem("portfolioData", JSON.stringify(updatedData));
      localStorage.setItem("userProjects", JSON.stringify(updatedData.projects));
      localStorage.setItem("userSocialMedia", JSON.stringify(updatedData.socialMedia));
      return updatedData;
    });
    navigate("/portfolio");
  };

  return (
    <div className="data-entry-container">
      <h2 className="data-entry-title">Enter Your Details</h2>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        onChange={handleInputChange}
        className="data-entry-input"
      />
      <input
        type="text"
        name="bio"
        placeholder="Short Bio"
        onChange={handleInputChange}
        className="data-entry-input"
      />
      <textarea
        name="aboutMe"
        placeholder="About Me"
        onChange={handleInputChange}
        className="data-entry-textarea"
      ></textarea>
      <input
        type="text"
        name="skills"
        placeholder="Skills (comma separated)"
        onChange={handleInputChange}
        className="data-entry-input"
      />

      <h3 className="text-lg font-bold mt-4">Projects</h3>
      {formData.projects.map((project, index) => (
        <div key={index} className="project-container">
          <input
            type="text"
            placeholder="Project Title"
            value={project.title}
            onChange={(e) => handleProjectChange(index, "title", e.target.value)}
            className="data-entry-input"
          />
          <input
            type="text"
            placeholder="Project Description"
            value={project.description}
            onChange={(e) =>
              handleProjectChange(index, "description", e.target.value)
            }
            className="data-entry-input"
          />
          <input
            type="text"
            placeholder="GitHub Link"
            value={project.github}
            onChange={(e) => handleProjectChange(index, "github", e.target.value)}
            className="data-entry-input"
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={project.image}
            onChange={(e) => handleProjectChange(index, "image", e.target.value)}
            className="data-entry-input"
          />
        </div>
      ))}
      <button onClick={addProject} className="add-button">
        Add Empty Project
      </button>

      <h3 className="text-lg font-bold mt-4">Add Project from GitHub</h3>
      <input
        type="text"
        name="githubRepo"
        placeholder="Paste GitHub repo link"
        value={formData.githubRepo}
        onChange={handleInputChange}
        className="data-entry-input"
      />
      <button onClick={fetchGitHubRepo} className="fetch-button">
        Fetch from GitHub
      </button>

      <h3 className="text-lg font-bold mt-4">Social Media Links</h3>
      {formData.socialMedia.map((entry, index) => (
        <div key={index} className="social-media-container">
          <input
            type="text"
            placeholder="Social Media Name"
            value={entry.name}
            onChange={(e) =>
              handleSocialMediaChange(index, "name", e.target.value)
            }
            className="data-entry-input"
          />
          <input
            type="text"
            placeholder="Social Media URL"
            value={entry.url}
            onChange={(e) =>
              handleSocialMediaChange(index, "url", e.target.value)
            }
            className="data-entry-input"
          />
        </div>
      ))}
      <button onClick={addSocialMediaEntry} className="add-button">
        Add Social Media
      </button>

      <button onClick={handleSubmit} className="data-entry-button">
        Generate Portfolio
      </button>
    </div>
  );
};

export default DataEntry;
