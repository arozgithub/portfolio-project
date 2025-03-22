import React, { useEffect, useState } from "react";
import "./Projects.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaGithub } from "react-icons/fa";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  // Fetch projects from GitHub and localStorage
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const savedProjects = JSON.parse(localStorage.getItem("userProjects")) || [];
        const response = await fetch("https://api.github.com/users/arozgithub/repos");
        const data = await response.json();
        const githubProjects = data.slice(0, 5).map((repo) => ({
          id: `github-${repo.id}`, // Unique ID for GitHub projects
          title: repo.name,
          description: repo.description || "No description available",
          image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
          github: repo.html_url,
        }));
        // Merge user projects & GitHub projects
        const allProjects = [...savedProjects, ...githubProjects];
        setProjects(allProjects);
        localStorage.setItem("portfolioProjects", JSON.stringify(allProjects)); // Persist projects
      } catch (error) {
        console.error("Error fetching GitHub repositories:", error);
      }
    };
    fetchProjects();
  }, []);

  // Handle drag-and-drop reordering
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedProjects = Array.from(projects);
    const [movedItem] = reorderedProjects.splice(result.source.index, 1);
    reorderedProjects.splice(result.destination.index, 0, movedItem);
    setProjects(reorderedProjects);
    localStorage.setItem("portfolioProjects", JSON.stringify(reorderedProjects));
  };

  // Handle project deletion
  const handleDelete = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem("portfolioProjects", JSON.stringify(updatedProjects));
  };

  return (
    <div className="projects-container">
      <h2 className="projects-title">My Projects</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="projects">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="projects-grid">
              {projects.map((project, index) => (
                <Draggable key={project.id} draggableId={project.id} index={index}>
                  {(provided) => (
                    <div 
                      ref={provided.innerRef} 
                      {...provided.draggableProps} 
                      {...provided.dragHandleProps} 
                      className="project-card"
                    >
                      {/* Delete Button */}
                      <button className="delete-button" onClick={() => handleDelete(project.id)}>✖</button>
                      <img src={project.image || "https://via.placeholder.com/150"} alt={project.title} className="project-image" />
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="github-link"
                      >
                        <FaGithub /> 
                      </a>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Projects;
