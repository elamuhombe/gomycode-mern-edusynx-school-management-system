/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Guardian } from '../../../types';

const ViewStudentData: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/student`);
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError('Error fetching students');
      }
    };

    const fetchGuardians = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user?role=guardian`);
        if (!response.ok) {
          throw new Error('Failed to fetch guardians');
        }
        const data = await response.json();
        setGuardians(data);
      } catch (error) {
        setError('Error fetching guardians');
      }
    };

    Promise.all([fetchStudents(), fetchGuardians()]).then(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Student Data</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : students.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border w-full">
            <thead>
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Student Name</th>
                <th className="border p-2">Gender</th>
                <th className="border p-2">Date of Birth</th>
                <th className="border p-2">Guardian Name</th>
                <th className="border p-2">Guardian Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => {
                const guardian = guardians.find(g => g._id === student.guardian);
                return (
                  <tr key={student._id}>
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{student.studentFirstName} {student.studentLastName}</td>
                    <td className="border p-2">{student.studentGender}</td>
                    <td className="border p-2">{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                    <td className="border p-2">{guardian ? `${guardian.firstName} ${guardian.lastName}` : 'Unknown Guardian'}</td>
                    <td className="border p-2">{guardian ? guardian.email : 'Unknown Email'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
};

export default ViewStudentData;
