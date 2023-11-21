import React from "react";
import "./AboutMe.css";

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
      </div>
    </div>
  );
};

export default AboutMe;
