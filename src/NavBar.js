import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import "./NavBar.css";

const NavBar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">About Me</Link>
          </li>
          <li>
            <Link to="/education">Education</Link>
          </li>
          <li>
            <Link to="/experience">Experience</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
