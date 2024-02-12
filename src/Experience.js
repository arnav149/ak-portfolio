import React from "react";
import "./Experience.css";

const ScrollableCard = ({ experiences }) => {
  return (
    <div className="scrollable-card">
      {experiences.map((experience, index) => (
        <div key={index} className="card-tem">
          <h4>{experience.title}</h4>
          <p>{experience.period}</p>
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
    <div className="experience">
      <ScrollableCard experiences={experiences} />
    </div>
  );
}
