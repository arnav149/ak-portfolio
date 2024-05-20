import React, { useState } from "react";
import "./Projects.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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

const CollapsibleList = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0); // Default to the first item being open

  const toggleItem = index => {
    // if (openIndex === index) return;
    setOpenIndex(prevOpenIndex => (prevOpenIndex === index ? null : index));
  };

  return (
    <div className="collapsible-container">
      {items.map((item, index) => (
        <div key={index}>
          <div onClick={() => toggleItem(index)} className="collapsible-header">
            {item.name}
            {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {openIndex === index && (
            <div className="collapsible-content">
              <div className="description">
                {renderDescription(item.description)}
              </div>
              <div className="technologies">
                <ul>
                  {item.technologies.map((technology, i) => (
                    <li key={i}>{technology}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default function Projects() {
  return (
    <div className="projects">
      <CollapsibleList items={projects} />
    </div>
  );
}
