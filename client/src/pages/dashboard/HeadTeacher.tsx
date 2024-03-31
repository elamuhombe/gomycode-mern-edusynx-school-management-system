import React, { useState, useEffect } from 'react';

const Admin: React.FC = () => {
  // State to hold data fetched from the server
  const [data, setData] = useState<any[]>([]);

  // Function to fetch data from the server
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data'); // Assuming you have an endpoint '/api/data' which returns admin data
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {/* Rendering fetched data */}
        {data.map((item, index) => (
          <li key={index}>{item.name}: {item.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
