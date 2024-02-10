import React, { useState } from "react";
import "./Experience.css";

const experiences = [
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
  // ... other experiences
];

const Card = ({ experience }) => (
  <div className="card">
    <h3>
      {experience.role} at {experience.company}
    </h3>
    <p>{experience.description}</p>
  </div>
);

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex(prevIndex =>
      prevIndex > 0 ? prevIndex - 1 : experiences.length - 1
    );
  };

  const handleNext = () => {
    setActiveIndex(prevIndex =>
      prevIndex < experiences.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="experience">
      <div className="carousel-container">
        <button onClick={handlePrev} className="arrow-button left">
          Left
        </button>
        <Card experience={experiences[activeIndex]} />
        <button onClick={handleNext} className="arrow-button right">
          Right
        </button>
      </div>
    </div>
  );
}
