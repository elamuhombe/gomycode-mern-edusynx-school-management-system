// Importing necessary modules from React and react-router-dom
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Functional component for a Call-To-Action Button
const CTAButton = ({ text, to }: { text: string; to: string }) => {
  // State to track if the button is clicked or not
  const [clicked, setClicked] = useState(false);

  // Function to handle button click event
  const handleClick = () => {
    setClicked(true); // Setting clicked state to true when button is clicked
  };

  // Returning a Link component with appropriate classes based on button click status
  return (
    <Link
      to={to}
      onClick={handleClick}
      className={`mt-4 inline-block ${clicked ? 'bg-red-200' : 'bg-red-400'} hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-full`}
    >
      {text}
    </Link>
  );
};

// Exporting the CTAButton component as the default export
export default CTAButton;

