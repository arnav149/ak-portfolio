import React, { useState, useEffect } from 'react';
import './TerminalLoader.css'; // import your CSS file

const TerminalLoader = ({ onLoadingComplete }) => {
  const [text, setText] = useState('');
  var prefix = 'coolperson@cool-device ~ % ';
  const [commandIndex, setCommandIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  
  useEffect(() => {
    const commands = ['cd ArnavsPortfolio', 'npm start'];
    
    const interval = setInterval(() => {
      if (commandIndex < commands.length) {
        const currentCommand = commands[commandIndex];

        if(charIndex === 0) {
            if(currentCommand === 'npm start') {
                setText((prevText) => prevText + prefix.replace('~', 'ArnavsPortfolio') + currentCommand[charIndex]);
            } else {
                setText((prevText) => prevText + prefix + currentCommand[charIndex]);
            }
        } else {
            setText((prevText) => prevText + currentCommand[charIndex]);
        }
        
        if (charIndex < currentCommand.length - 1) {
          setCharIndex(charIndex + 1);
        } else {
          setText((prevText) => prevText + '\n');
          setCommandIndex(commandIndex + 1);
          setCharIndex(0);
        }
      } else {
        clearInterval(interval);
        onLoadingComplete();
      }
    }, 160); // Adjust time as needed for typing speed

    return () => clearInterval(interval);
  }, [commandIndex, charIndex, onLoadingComplete]);

  return (
    <div className="terminal">
      {text.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
};

export default TerminalLoader;