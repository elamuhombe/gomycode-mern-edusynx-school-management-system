import React, { useState, useEffect } from 'react';

const ViewStudentData: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  useEffect(() => {
    // Fetch all students
    fetch(`${import.meta.env.VITE_API_URL}/student`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        return response.json();
      })
      .then(data => {
        console.log('Student data:', data); // Log the data received
        setStudents(data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, []);

  // Calculate the indexes of the first and last student on the current page
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Student Data</h2>
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
              {currentStudents.map((student, index) => (
                <tr key={student._id}>
                  <td className="border p-2">{indexOfFirstStudent + index + 1}</td>
                  <td className="border p-2">{student.studentFirstName} {student.studentLastName}</td>
                  <td className="border p-2">{student.studentGender}</td>
                  <td className="border p-2">{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(students.length / studentsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 mx-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
};

export default ViewStudentData;
