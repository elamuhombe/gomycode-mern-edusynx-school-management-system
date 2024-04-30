import React, { useState, useEffect } from "react";
import useSubmitForm from "../../../hooks/useSubmitForm";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { IStudent } from "../../../types"; // Assuming you have a Student interface defined in types.ts
import useFetchStudents from "../../../hooks/useFetchStudents";
import Swal from "sweetalert2";

const ViewClassData: React.FC = () => {
  // State variables
  const [filterClass, setFilterClass] = useState<string>("All");
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [editedStudent, setEditedStudent] = useState<IStudent | null>(null);
  const { students, loading, setLoading, setStudents, setError, error } =
    useFetchStudents(); // Use the custom hook to fetch students

  const { submitForm } = useSubmitForm();

  // Effect to log editing student id and edited student when they change
  useEffect(() => {
    console.log(editingStudentId, editedStudent);
  }, [editingStudentId, editedStudent]);

  // Count the number of students based on the filter
  const numberOfStudents = students.filter(
    (student) => filterClass === "All" || student.className === filterClass
  ).length;

  const handleDelete = async (studentId: string) => {
    try {
      setLoading(true);
      // Filter out the student to be deleted from the local state
      const updatedStudents = students.filter(
        (student) => student._id !== studentId // Changed student.id to student._id
      );
      setStudents(updatedStudents);

      // Send a DELETE request to the server to delete the student
      const path = `http://localhost:5100/student/${studentId}`;
      const method = "DELETE";
      await submitForm(path, method, {});

      console.log(`Student with ID ${studentId} deleted successfully.`);
    } catch (error) {
      // Handle error deleting student
      setError("Failed to delete student. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  // Function to handle editing a student
  const handleEditStudent = (student: IStudent) => {
    setEditingStudentId(student._id);
    setEditedStudent(student);
  };



// Function to save changes made to a student
const handleSave = async () => {
  try {
    setLoading(true);
    const path = `http://localhost:5100/student/${editingStudentId}`;
    const method = "PUT"; // Assuming you are using a PUT request to update the student data
    await submitForm(path, method, editedStudent);
    // Refetch the data after saving to update the UI
    const result = await submitForm(
      "http://localhost:5100/student/",
      "GET",
      {}
    );
    setStudents(result);
    // Show success message
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: `Student with ID ${editingStudentId} updated successfully.`,
    });
  } catch (error) {
    setError("Failed to save student data. Please try again.");
    // Show error message
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to save student data. Please try again.',
    });
  } finally {
    setLoading(false);
  }
};


  const classes = [
    "All",
    ...new Set(students.map((student) => student.className)),
  ];
  // Function to export data as CSV
  const exportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      students
        .map((student) => {
          const { _id, studentFirstName, studentLastName, className } = student;
          return `${_id},${studentFirstName},${studentLastName},${className}`;
        })
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="mt-16 ml-8">
      <h1 className="text-xl font-bold mb-4">Class View</h1>
      <p className="mb-4">
        <span className="font-bold">Number of students: </span>
        {numberOfStudents}
      </p>
      <div className="mb-4">
        <label htmlFor="filterClass" className="mr-2">
          Filter by Class:
        </label>
        <select
          id="filterClass"
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
          className="border rounded px-2 py-1">
          {classes.map(
            (className, index) =>
              typeof className === "string" && (
                <option key={index} value={className}>
                  {className}
                </option>
              )
          )}
        </select>
      </div>
      <div className="mb-4">
        <button
          onClick={exportCSV}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Export CSV
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="table-auto border-collapse border">
          <thead>
            <tr>
              <th className="px-4 py-2">No.</th>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Class</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students
              .filter(
                (student) =>
                  filterClass === "All" || student.className === filterClass
              )
              .map((student, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    {editingStudentId === student._id ? (
                      <input
                        type="text"
                        value={editedStudent?.studentFirstName || ""}
                        onChange={(e) =>
                          setEditedStudent({
                            ...editedStudent!,
                            studentFirstName: e.target.value,
                          })
                        }
                      />
                    ) : (
                      student.studentFirstName
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editingStudentId === student._id ? (
                      <input
                        type="text"
                        value={editedStudent?.studentLastName || ""}
                        onChange={(e) =>
                          setEditedStudent({
                            ...editedStudent!,
                            studentLastName: e.target.value,
                          })
                        }
                      />
                    ) : (
                      student.studentLastName
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {typeof student.className === "string"
                      ? student.className
                      : ""}
                  </td>
                  <td className="border px-4 py-2">
                    {editingStudentId === student._id ? (
                      <button
                        onClick={handleSave} // Implement handleSave function
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditStudent(student)} // Implement handleEditStudent function
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <AiOutlineEdit />
                      </button>
                    )}
                    <button
                      onClick={() => student._id && handleDelete(student._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      <AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewClassData;
