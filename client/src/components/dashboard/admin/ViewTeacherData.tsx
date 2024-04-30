import React, { useState, useEffect } from 'react';
import { Teacher } from './types'; // Assuming you have a types file defining the Teacher type

const ViewTeacherData: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    // Fetch teacher data from an API or local storage
    fetchTeacherData()
      .then(data => setTeachers(data))
      .catch(error => console.error('Error fetching teacher data:', error));
  }, []);

  const fetchTeacherData = async () => {
    // Example fetch function, replace with actual API call
    const response = await fetch('https://api.example.com/teachers');
    if (!response.ok) {
      throw new Error('Failed to fetch teacher data');
    }
    const data = await response.json();
    return data;
  };

  return (
    <div>
      <h1>Teacher Data</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Subject</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {teachers.map(teacher => (
            <tr key={teacher.id}>
              <td>{teacher.id}</td>
              <td>{teacher.name}</td>
              <td>{teacher.subject}</td>
              {/* Render more teacher data fields as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTeacherData;
