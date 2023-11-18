import React, { useState } from 'react';
import './App.css';
import TerminalLoader from './TerminalLoader.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutMe from './AboutMe';
import NavBar  from './NavBar';

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  const handleLoadingComplete = () => {
    setTimeout(() => {
      setLoadingComplete(true);
    }, 1000);
  };
    
  return (
    <div>
      {!loadingComplete && 
      <div className="loadingScreen">
        <TerminalLoader onLoadingComplete={handleLoadingComplete} />
      </div>
      }
      {loadingComplete && 
        // Your actual app content goes here...
        <Router>
          <div className="appContent">
              <NavBar />
              <Routes>
                  <Route path="/" element={<AboutMe />} />
                  {/* Add other routes here */}
              </Routes>
          </div>
        </Router>
      }
    </div>
  );
}

export default App;
