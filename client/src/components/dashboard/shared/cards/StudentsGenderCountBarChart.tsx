import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define the structure of each item in the data array
interface GenderCount {
  gender: string;
  count: number;
}

// Define a functional component for the bar chart
const StudentsGenderCountBarChart: React.FC = () => {
  // State to hold the data and loading status
  const [data, setData] = useState<GenderCount[]>([]); // State for storing gender count data
  const [loading, setLoading] = useState<boolean>(true); // State to track loading state

  // Fetch data from an API endpoint on component mount
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/gender-count`)
      .then(response => response.json())
      .then((data: GenderCount[]) => {
        console.log('Fetched data:', data); // Log fetched data to console
        setData(data); // Update state with fetched data
        setLoading(false); // Update loading state to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching gender count:', error); // Log error if data fetch fails
        setLoading(false); // Update loading state to false on error
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Render a loading indicator while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Determine the range of values to display on the Y-axis
  const maxCount = Math.max(...data.map(item => item.count)); // Find maximum count value in data
  const yAxisTicks = Array.from({ length: Math.ceil(maxCount / 5) }, (_, index) => (index + 1) * 5); // Generate Y-axis ticks based on maxCount

  // Return the bar chart component
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={data} // Pass data to BarChart component
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }} // Define margins for the chart
      >
        <CartesianGrid strokeDasharray="3 3" /> {/* Add Cartesian grid with dashed stroke */}
        <XAxis dataKey="gender" /> {/* Define X-axis using 'gender' data */}
        <YAxis ticks={yAxisTicks} /> {/* Define Y-axis with custom ticks */}
        <Tooltip /> {/* Enable tooltip for chart */}
        <Legend /> {/* Enable legend for chart */}
        <Bar dataKey="count" fill="#8884d8" /> {/* Define bar chart with 'count' data and fill color */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StudentsGenderCountBarChart; // Export the component for use in other parts of the application
