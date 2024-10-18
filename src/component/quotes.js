import React, { useEffect, useState } from 'react';
import Logout from './logout';
import '../style.css';

// Function to calculate the difference in days from a reference date (e.g., Oct 18, 2024)
const getDayNumberSinceStart = () => {
  const today = new Date();  // Current date (today)
  const referenceDate = new Date(2024, 9, 18);  // Reference date (October 18, 2024, month is 0-based)
  
  // Calculate the difference in days
  const diffInTime = today.getTime() - referenceDate.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInDays = Math.floor(diffInTime / oneDay);

  return diffInDays ;  // This will give us 0 for October 18, 2024, and increment by 1 each day
};

const QuotesComponent = () => {
  const [quote, setQuote] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [dayNumber, setDayNumber] = useState(getDayNumberSinceStart());
  // Fetch quotes from the JSON file and display the quote based on the current day since reference date
  useEffect(() => {
    fetch('/quotes.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const dayNumber = getDayNumberSinceStart();  // Days since October 18, 2024
        const quoteOfTheDay = data[dayNumber % data.length];
        console.log("Quote of the day:", quoteOfTheDay); // Loop back if quotes end
        setQuote(quoteOfTheDay.quote);  // Set the quote of the day
      })
      .catch((error) => console.error('Error fetching quotes:', error));
  }, [dayNumber]);

  // Update the live date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
      setDayNumber(getDayNumberSinceStart());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app">
        <h2>Day {dayNumber},Waiting</h2>
      <div className="quote-container">
        <h1>{quote}</h1>
        
      </div>
      
      {/* Position the Logout button in the top-right */}
      <div className="logout">
        <Logout />
      </div>
      
      <div className="date-time">
        {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
      </div>
    </div>
  );
};




export default QuotesComponent;
