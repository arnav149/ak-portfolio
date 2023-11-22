import React, { useState, useEffect } from "react";
import {
  FaBed,
  FaBug,
  FaRedoAlt,
  FaInstagram,
  FaLinkedinIn
} from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import "./AboutMe.css";

const AboutMe = () => {
  const elements = [
    "Eat.",
    <FaBowlFood key="food" />,
    "\n",
    "Sleep.",
    <FaBed key="bed" />,
    "\n",
    "Debug.",
    <FaBug key="bug" />,
    "\n",
    "Repeat.",
    <FaRedoAlt key="redo" />,
    "\n"
  ];
  const [index, setIndex] = useState(0);
  const [visibleElements, setVisibleElements] = useState([]);

  useEffect(() => {
    if (index > elements.length) {
      // Reset the index after the last element
      setTimeout(() => {
        setIndex(0);
        setVisibleElements([]);
      }, 2000); // Delay before restarting
      return;
    }

    // Timer to update index
    const timer = setTimeout(() => {
      setVisibleElements(elements.slice(0, index));
      setIndex(index + 1);
    }, 150); // Adjust this value to control typing speed

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="about-me">
      <div className="profile-picture">
        <img src={process.env.PUBLIC_URL + "/profile_pic.jpg"} alt="Profile" />
      </div>
      <div className="content-card">
        <h1>About Me</h1>
        <p>
          I'm like a video game character - I level up by drinking coffee and
          eating fried chicken.
        </p>
        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/arnav-kasturia/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://www.instagram.com/kasturiaarnav/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
      <div className="loop-text">{visibleElements}</div>
    </div>
  );
};

export default AboutMe;
