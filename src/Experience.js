import React from "react";
import "./Experience.css";

const ExperienceCard = ({ experiences }) => {
  return (
    <div className="experience-card">
      {experiences.map((experience, index) => (
        <div key={index} className="card-item">
          <div className="period">{experience.period}</div>
          <h4>{experience.title}</h4>
          <p>{experience.description}</p>
        </div>
      ))}
    </div>
  );
};

export default function Experience() {
  const experiences = [
    {
      title: "Job Title 1",
      period: "Jan 2020 - Dec 2020",
      description: "Description of your role and achievements."
    },
    {
      title: "Job Title 1",
      period: "Jan 2020 - Dec 2020",
      description: "Description of your role and achievements."
    },
    {
      title: "Job Title 1",
      period: "Jan 2020 - Dec 2020",
      description: "Description of your role and achievements."
    },
    {
      title: "Job Title 1",
      period: "Jan 2020 - Dec 2020",
      description: "Description of your role and achievements."
    }
    // Add more experience objects here
  ];

  return (
    <div className="experience-container">
      <div className="experience">
        <ExperienceCard experiences={experiences} />
      </div>
    </div>
  );
}
