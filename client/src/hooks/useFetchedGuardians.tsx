import { useState } from "react";
// Function to fetch all guardians
const useFetchedGuardians = async () => {
    const [error, setError] = useState<string | null>(null);
    try {
      // Make GET request to fetch all guardians
      const response = await fetch('/guardians');
      
      // Check if request was not successful
      if (!response.ok) {
        // Handle error response
       
       setError('Failed to fetch guardians');
      }
      
      // Parse response data
      const guardians = await response.json();
      return guardians;
    } catch (error) {
      // Handle any errors
      setError('Error fetching guardians:');
      throw error;
    }
  };
  
//   // Function to display number of guardians
//   const displayNumberOfGuardians = (guardians: string | any[]) => {
//     // Log the number of guardians
//     console.log('Number of guardians:', guardians.length);
//   };
  
export default useFetchedGuardians;