import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Welcome() {
  const location = useLocation();
  const { name } = location.state || {}; 
  const [displayText, setDisplayText] = useState("");
  const navigate = useNavigate();
  
  console.log("Username from location state:", name);
  const text = `-> Welcome, ${name}`;
  const writingSpeed = 100;

  useEffect(() => {
    // Check if the welcome message has already been shown
    const hasShownWelcome = localStorage.getItem('hasShownWelcome');

    // If the welcome message has not been shown, proceed to show it
    if (!hasShownWelcome) {
      // Set the item in local storage to prevent showing the welcome message again
      localStorage.setItem('hasShownWelcome', 'true');

      // Show the welcome message for 4 seconds and then navigate
      const timer = setTimeout(() => {
        navigate('/quotes');
      }, 4000);

      // Animate the display of welcome text
      let currentIdx = 0;
      const intervalId = setInterval(() => {
        if (currentIdx < text.length) {
          setDisplayText((prev) => prev + text[currentIdx]);
          currentIdx++;
        } else {
          clearInterval(intervalId); // Stop the interval when full text is displayed
        }
      }, writingSpeed);

      return () => {
        clearTimeout(timer);
        clearInterval(intervalId);
      };
    } else {
      // If the message has already been shown, redirect to the quotes page immediately
      navigate('/quotes');
    }
  }, [navigate, text]);

  return (
    <div>
      <h1>{displayText}</h1>
    </div>
  );
}

export default Welcome;
