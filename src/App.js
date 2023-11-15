import React, { useState } from 'react';
import './App.css';
import TerminalLoader from './TerminalLoader.js'

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  const handleLoadingComplete = () => {
    setTimeout(() => {
      setLoadingComplete(true);
    }, 1000);
  };
    
  return (
    <div className="App">
      {!loadingComplete && <TerminalLoader onLoadingComplete={handleLoadingComplete} />}
      {loadingComplete && 
        // Your actual app content goes here...
        <p>HELLO</p>
      }
    </div>
  );
}

export default App;
