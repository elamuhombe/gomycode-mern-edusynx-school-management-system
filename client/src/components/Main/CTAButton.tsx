import React from 'react';
import { useCustomNavigation } from '../../hooks/useNavigation'; // Import the custom navigation hook

interface CTAButtonProps {
  text: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ text }) => {
  const { goToRegisterPage } = useCustomNavigation(); // Call the hook to get the navigation function

  // Directly navigate to the register page
  const handleClick = () => {
    goToRegisterPage(); // Use the navigation function to navigate
  };

  return (
    <button 
      className="w-40 bg-red-400 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full mt-4" 
      onClick={handleClick} // Attach the click handler
    >
      {text}
    </button>
  );
};

export default CTAButton;
