import { useNavigate } from 'react-router-dom';

// Custom hook for navigation-related functions
const useCustomNavigation = () => {
  // Access the navigation function from react-router-dom
  const navigate = useNavigate();

  // Function to navigate to the register page
  const goToRegisterPage = () => {
    navigate('/register'); // Use the navigate function to go to the '/register' route
  };

  // Return an object containing the navigation functions
  return {
    goToRegisterPage, // Export the goToRegisterPage function
    // Add more functions as needed
  };
};

export default useCustomNavigation;
