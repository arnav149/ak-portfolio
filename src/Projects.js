import React, { useState } from "react";
import "./Projects.css";
import { MdArrowForward, MdArrowBack } from "react-icons/md";

const projects = [
  {
    name: "GenAI Based Drive Score Coach",
    description: [
      "Created an MVP to answer questions regarding any change in a member’s drive score",
      "Utilized Langchain to interface the model explainability approach in a natural language form"
    ],
    technologies: ["Python", "Flask", "Docker"]
  },
  {
    name: "StayMate iOS App",
    description: [
      "Used MVC architecture to create an app to help interns find summer stays and sublease their apartments",
      "Performed HTTP requests by referencing Google’s documentation to retrieve data from Firebase Firestore",
      "Utilized TableView to present the apartments listing to the user for a selected location and period of time",
      "Programmed to enable the user to see the location of a particular apartment in a MapView"
    ],
    technologies: ["Swift", "Google Firebase"]
  },
  {
    name: "KarmaPool Slackbot",
    description: [
      "Created a slack bot MVP with Python backend which employees could use to find other employees to carpool with",
      "Used Google Maps API for find a ride functionality which looked for any nearby employees available to give a ride",
      "Created a private slack channel between two employees if they were nearby and available to carpool together"
    ],
    technologies: ["Python", "Flask", "Docker"]
  },
  {
    name: "Headlamp Inc. (Capstone Project)",
    description: [
      "Worked extensively on the front-end of the community platform dedicated to help veterans transition into citizen life",
      "Referenced the designs provided to create the UI for landing page, user dashboard, and log in/sign up forms",
      "Collaborated with a teammate to create the API for edit profile functionality in Node.JS",
      "Implemented end-to-end functionality to enable a user to search other users in the platform"
    ],
    technologies: ["React.JS", "Node.JS"]
  }
];

const renderDescription = description => {
  if (Array.isArray(description)) {
    return (
      <ul>
        {description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }
  return <p>{description}</p>;
};

const Card = ({ project }) => (
  <div className="project-card">
    <h2>{project.name}</h2>
    {renderDescription(project.description)}
    <div className="technologies">
      <ul>
        {project.technologies.map((tech, index) => (
          <li key={index}>{tech}</li>
        ))}
      </ul>
    </div>
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
