// ViewClassData.tsx

import React, { useState, useEffect } from "react";
import useSubmitForm from "../../../hooks/useSubmitForm";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

interface Class {
  _id?: string;
  name: string;
  subject: string;
  teacher: string;
  streams: string[];
  students: number;
}

const ViewClassData: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { submitForm } = useSubmitForm();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const path = "http://localhost:5100/class/";
      const method = "GET";
      try {
        const result = await submitForm(path, method, {});
        setClasses(result);
        console.log({classes:result})
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch class data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteStreamFromClass = async (classId: string, stream: string) => {
    try {
      console.log(`Deleting stream "${stream}" from class with ID: ${classId}`);
      const path = `http://localhost:5100/class/${classId}/stream/${stream}`;
      const method = "DELETE";
      const response = await fetch(path, { method });
      if (response.ok) {
        console.log(`Stream "${stream}" deleted successfully from class with ID ${classId}`);
        // Update state to reflect the deletion
        setClasses(prevClasses =>
          prevClasses.map(cls =>
            cls._id === classId ? { ...cls, streams: cls.streams.filter(s => s !== stream) } : cls
          )
        );
      } else {
        console.error(`Failed to delete stream "${stream}" from class with ID ${classId}`);
        // Handle error response from server
      }
    } catch (error) {
      console.error(`Error deleting stream "${stream}" from class with ID ${classId}:`, error);
      // Handle network or other errors
    }
  };

  return (
    <div className="mt-16 ml-8">
      <h1 className="text-xl font-bold mb-4">Classes Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="table-auto border-collapse border">
          <thead>
            <tr>
              <th className="px-4 py-2">No.</th>
              <th className="px-4 py-2 border-r">Name</th>
              <th className="px-4 py-2 border-r">Subject</th>
              <th className="px-4 py-2 border-r">Teacher</th>
              <th className="px-4 py-2 border-r">Stream</th>
              <th className="px-4 py-2 border-r">Students</th>
              <th className="px-4 py-2 border-r">Edit</th>
              <th className="px-4 py-2 border-r">Delete</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls, index) =>
              cls.streams.map((stream, idx) => (
                <tr key={`${index}-${idx}`}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{cls.name}</td>
                  <td className="border px-4 py-2">{cls.subject}</td>
                  <td className="border px-4 py-2">{cls.teacher}</td>
                  <td className="border px-4 py-2">{stream}</td>
                  <td className="border px-4 py-2">{cls.students}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => {
                        console.log(`Editing class with ID: ${cls._id}`);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      <AiOutlineEdit />
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => cls._id && deleteStreamFromClass(cls._id, stream)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      <AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewClassData;
