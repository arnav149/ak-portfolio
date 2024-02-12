import React, { useState } from "react";
import "./App.css";
import TerminalLoader from "./TerminalLoader.js";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import AboutMe from "./AboutMe";
import NavBar from "./NavBar";
import Education from "./Education";
import Projects from "./Projects";

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  const handleLoadingComplete = () => {
    setTimeout(() => {
      setLoadingComplete(true);
    }, 1000);
  };

  return (
    <div>
      {!loadingComplete && (
        <div className="loadingScreen">
          <TerminalLoader onLoadingComplete={handleLoadingComplete} />
        </div>
      )}
      {loadingComplete && (
        // Your actual app content goes here...
        <Router>
          <div className="appContent">
            <NavBar />
            <Routes>
              <Route path="/" element={<AboutMe />} />
              <Route path="/education" element={<Education />} />
              {/* <Route path="/projects" element={<Projects />} /> */}
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
