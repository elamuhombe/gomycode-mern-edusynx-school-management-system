import React, { useState, useEffect } from "react";
import {useSubmitForm} from "./../../../hooks/hooks";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

// Define interface for student object
interface Student {
  _id?: string; // Assuming _id is of type string
  id?: string | null;
  firstName: string;
  lastName: string;
  gender: string;
  studentClass: string;
  previousSchool: string;
}

const ViewStudentData: React.FC = () => {
  const [formData, setFormData] = useState<Student>({
    id: undefined,
    firstName: "",
    lastName: "",
    gender: "",
    studentClass: "",
    previousSchool: "",
  });

  const [students, setStudents] = useState<Student[]>([]);
  const [editableIndex, setEditableIndex] = useState<number | null>(null);

  const { submitForm } = useSubmitForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const path = "http://localhost:5100/student/";
      const method = "GET";
      try {
        const result = await submitForm(path, method, {});
        setStudents(result);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch student data. Please try again.");
      }finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (index: number) => {
    const { _id, firstName, lastName, gender, studentClass, previousSchool } =
      students[index];
    setEditableIndex(index);
    setFormData({
      id: _id, // Assigning _id to id
      firstName,
      lastName,
      gender,
      studentClass,
      previousSchool,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log("Updated form data:");

    if (formData) {
      setFormData(
        (prevState) =>
          ({
            ...prevState,
            [name]: value,
          } as Student)
      );
    }
  };

  const handleSaveClick = async () => {
    console.log("Save button clicked");
    if (formData) {
      const studentId = formData.id !== undefined ? formData.id : ""; // Assuming a default value of empty string
      if (!studentId) {
        // Handle the case where id is null or undefined (e.g., display error)
        console.error("Student ID is null or undefined");
        return;
      }
      const postData = {
        ...formData,
        id: studentId,
      };

      try {
        console.log("Submitting form data:", postData);
        const apiUrl = `http://localhost:5100/student/${studentId}`;
        const method = "PUT";
        const result = await submitForm(apiUrl, method, postData);

        // Assuming result contains the updated student data
        const updatedStudent = result as Student;
        const updatedStudents = students.map((student) =>
          student.id === updatedStudent.id ? updatedStudent : student
        );
        setStudents(updatedStudents);
        setEditableIndex(null); // Reset editableIndex after saving
      } catch (error) {
        // Handle errors
        console.error("Error updating student:", error);
      }
    } else {
      // Handle the case where formData is null (e.g., display an error message)
    }
  };

  console.log("Before Save Button JSX");

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Student Data</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-3">#</th>
            <th className="border p-3">First Name</th>
            <th className="border p-3">Last Name</th>
            <th className="border p-3">Gender</th>
            <th className="border p-3">Grade</th>
            <th className="border p-3">Previous School</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
              <td className="border p-3">{index + 1}</td>
              <td className="border p-3">
                {editableIndex === index ? (
                  <input
                    type="text"
                    name="firstName"
                    value={formData?.firstName || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  student.firstName
                )}
              </td>
              <td className="border p-3">
                {editableIndex === index ? (
                  <input
                    type="text"
                    name="lastName"
                    value={formData?.lastName || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  student.lastName
                )}
              </td>
              <td className="border p-3">
                {editableIndex === index ? (
                  <input
                    type="text"
                    name="gender"
                    value={formData?.gender || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  student.gender
                )}
              </td>
              <td className="border p-3">
                {editableIndex === index ? (
                  <input
                    type="text"
                    name="studentClass"
                    value={formData?.studentClass || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  student.studentClass
                )}
              </td>
              <td className="border p-3">
                {editableIndex === index ? (
                  <input
                    type="text"
                    name="previousSchool"
                    value={formData?.previousSchool || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  student.previousSchool
                )}
              </td>
              <td className="border p-3">
                {editableIndex === index ? (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handleSaveClick}>
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleEditClick(index)}>
                    <AiOutlineEdit />
                  </button>
                )}

                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  <AiOutlineDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  console.log("After Save Button JSX");
};

export default ViewStudentData;
