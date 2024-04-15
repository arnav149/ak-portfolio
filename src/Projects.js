import React, { useState } from "react";
import "./Projects.css";
import { MdArrowForward, MdArrowBack } from "react-icons/md";

const projects = [
  {
    name: "P1",
    description: "...",
    technologies: ["a", "b"]
  },
  {
    name: "P2",
    description: "...",
    technologies: []
  }
];

const Card = ({ project }) => (
  <div className="project-card">
    <h2>{project.name}</h2>
    <p>{project.description}</p>
    <ul>
      {project.technologies.map((tech, index) => (
        <li key={index}>{tech}</li>
      ))}
    </ul>
  </div>
);

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex(prevIndex =>
      prevIndex > 0 ? prevIndex - 1 : projects.length - 1
    );
  };

  const handleNext = () => {
    setActiveIndex(prevIndex =>
      prevIndex < projects.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="projects">
      <div className="carousel-container">
        <Card project={projects[activeIndex]} />
        <div className="card-buttons">
          <button onClick={handleNext} className="button">
            <MdArrowBack />
          </button>
          <button onClick={handleNext} className="button">
            <MdArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
}
