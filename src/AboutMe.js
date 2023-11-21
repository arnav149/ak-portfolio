import React from "react";
import "./AboutMe.css";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

const AboutMe = () => {
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
    </div>
  );
};

export default AboutMe;
