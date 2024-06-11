import React, { useState, useEffect } from 'react';

const ViewClassData: React.FC = () => {
  const [classNames, setClassNames] = useState<string[]>([]);
  const [selectedClassName, setSelectedClassName] = useState<string>('');
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    // Fetch class names
    fetch(`${import.meta.env.VITE_API_URL}/classes`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch class names');
        }
        return response.json();
      })
      .then(data => {
        setClassNames(data);
      })
      .catch(error => {
        console.error('Error fetching class names:', error);
      });
  }, []);

  const handleClassNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClassName(e.target.value);
  };

  useEffect(() => {
    if (selectedClassName !== '') {
      // Fetch students by class name
      fetch(`${import.meta.env.VITE_API_URL}/students/${encodeURIComponent(selectedClassName)}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch students');
          }
          return response.json();
        })
        .then(data => {
          console.log('Class names:', data); // Log the data received
          setStudents(data);
        })
        .catch(error => {
          console.error('Error fetching students:', error);
        });
    }
  }, [selectedClassName]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">View Class Data</h2>
      <label htmlFor="className" className="block mb-2">Select Class:</label>
      <select id="className" value={selectedClassName} onChange={handleClassNameChange} className="border rounded p-2 mb-4">
        <option value="">Select a class</option>
        {classNames.map(className => (
          <option key={className} value={className}>{className}</option>
        ))}
      </select>
      {students.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border w-full">
            <thead>
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Student Name</th>
                <th className="border p-2">Gender</th>
                <th className="border p-2">Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student._id}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{student.studentFirstName} {student.studentLastName}</td>
                  <td className="border p-2">{student.studentGender}</td>
                  <td className="border p-2">{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No students found for the selected class.</p>
      )}
    </div>
  );
};

export default ViewClassData;
