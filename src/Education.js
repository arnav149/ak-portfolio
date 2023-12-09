import React from "react";
import "./Education.css";

const Education = () => {
  return (
    <div className="education">
      <div className="asu-logo">
        <img src={process.env.PUBLIC_URL + "/asu-logo.png"} alt="Logo" />
        <div className="education-text">
          <p>
            Bachelors in <b>Computer Systems Engineering</b>
          </p>
          <p>
            Graduated <b>December 2021</b>
          </p>
          <p>
            GPA: <b>4.0</b>
          </p>
        </div>
      </div>
      <div className="grad-video">
        <video width={600} height={400} controls={true}>
          <source
            src={process.env.PUBLIC_URL + "/grad-video.mp4"}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Education;
