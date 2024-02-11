import React, { useState } from "react";
import "./Projects.css";

const projects = [
  {
    id: 1,
    role: "Frontend Developer",
    company: "Company A",
    description: "..."
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Company B",
    description: "..."
  }
];

const Card = ({ project }) => (
  <div className="card">
    <h3>
      {project.role} at {project.company}
    </h3>
    <p>{project.description}</p>
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
        <button onClick={handlePrev} className="arrow-button left">
          Left
        </button>
        <Card project={projects[activeIndex]} />
        <button onClick={handleNext} className="arrow-button right">
          Right
        </button>
      </div>
    </div>
  );
}
