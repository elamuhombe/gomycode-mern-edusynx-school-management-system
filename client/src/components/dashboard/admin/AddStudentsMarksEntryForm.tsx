import React, { useState, useEffect } from "react";
import { IExam, IStudent, ISubject } from "../../../types";
import Swal from "sweetalert2"; //Impor SweetAlert for notifications

const AddStudentsMarksEntry: React.FC = () => {
  // State declarations
  const [students, setStudents] = useState<IStudent[]>([]);
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [marks, setMarks] = useState<{
    [studentId: string]: { [subject: string]: number };
  }>({});
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [marksInput, setMarksInput] = useState<string>("");

  const [exams, setExams] = useState<IExam[]>([]); // Adjust the type to IExam[]
  const [isEditing, setIsEditing] = useState<boolean>(false); // State to track edit mode

  useEffect(() => {
    // Fetch initial data on component mount
    fetchAvailableExams();
    fetchStudents();
    fetchSubjects();
  }, []);

  // Fetch available exams from the server
  const fetchAvailableExams = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/exam`);
      const data: IExam[] = await response.json();
      console.log("Data received from API:", data);
      setExams(data); // Set the entire array of IExam objects to state
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };
  // Fetch available student data from the server
  const fetchStudents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/student`);
      const data = await response.json();
      console.log("Students data received from API:", data);
      setStudents(data);
      // Handle student data here, e.g., setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Fetch subject data from the server
  const fetchSubjects = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/subject`);
      const data = await response.json();
      console.log("Subjects data received from API:", data);
      setSubjects(data); // Assuming data is an array of subject names
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  // const handleDeleteMarks = (studentId: string, subject: string) => {
  //   // Implement functionality to delete marks for a student and subject
  // };

  // Function to save marks for a student and subject
  const handleSaveMarks = async (studentId: string, subject: string) => {
    try {
      // Ensure selectedExam is the ObjectId of the selected exam
      const selectedExamId = exams.find(
        (exam) => exam.examName === selectedExam
      )?._id;
      if (!selectedExamId) {
        throw new Error("Selected exam not found");
      }

      // Prepare the data to be sent to the server
      // Assuming subjects is an array containing subject names
      // Assuming marks is an object containing marks for each subject for the given student

      // Construct the subjectMarks array with subject name and marks
      const subjectMarks = subjects.map((subject) => ({
        subjectName: subject.subject_name, // Assuming subject_name is the property containing the subject name
        marks: marks[studentId][subject.subject_name], // Assuming marks is structured as marks[studentId][subject_name]
      }));

      const data = {
        studentId,
        examId: selectedExamId,
        subject: subject,
        subjectMarks,
      };

      // Send an HTTP POST request to the server
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/saveStudentMarks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save marks");
      }

      //handle success response
      Swal.fire("Success!", "Marks saved successfully", "success");
    } catch (error) {
      // Handle error
      Swal.fire("Error!", "Failed to save marks", "error");
    }
  };

  // Function to toggle edit mode
  const handleToggleEdit = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Students Marks</h2>
      <button
        onClick={handleToggleEdit}
        className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4 ${
          selectedExam ? "" : "opacity-50 cursor-not-allowed"
        }`}
        disabled={!selectedExam}>
        {isEditing ? "Finish Editing" : "Add"}
      </button>

      <label className="block mb-2">Select Exam:</label>
      <select
        value={selectedExam}
        onChange={(e) => setSelectedExam(e.target.value)}
        className="block border border-gray-300 rounded px-3 py-2 mb-4">
        <option value="">Select Exam</option>
        {exams.map((exam, index) => (
          <option key={index} value={exam.examName}>
            {exam.examName}
          </option>
        ))}
      </select>

      <table className="w-full mb-8">
        <thead>
          <tr>
            <th className="border px-4 py-2">Index</th>
            <th className="border px-4 py-2">Student Name</th>
            {subjects.map((subject, index) => (
              <th key={index} className="border px-4 py-2">
                {subject.subject_name}
              </th>
            ))}
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">
                {student.studentFirstName} {student.studentLastName}
              </td>
              {subjects.map((subject, subjectIndex) => (
                <td key={subjectIndex} className="border px-4 py-2">
                  <input
                    type="text"
                    value={
                      marks[student._id] &&
                      marks[student._id][subject.subject_name] !== undefined
                        ? marks[student._id][subject.subject_name]
                        : ""
                    }
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const numericValue = inputValue.replace(/[^\d.]/g, ""); // Filter out non-numeric characters
                      const newMarks = { ...marks };
                      if (!newMarks[student._id]) newMarks[student._id] = {};
                      newMarks[student._id][subject.subject_name] =
                        parseFloat(numericValue);
                      setMarks(newMarks);
                      console.log("Marks:", newMarks);
                    }}
                    className={`border border-gray-300 rounded px-3 py-2 w-full ${
                      isEditing ? "" : "bg-gray-200"
                    }`}
                    disabled={!isEditing}
                    // Log the marks to the console
                  />
                </td>
              ))}
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleSaveMarks(student._id, selectedSubject)} // Use selectedSubject instead of subject
                  className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ${
                    isEditing ? "" : "hidden"
                  }`}>
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddStudentsMarksEntry;
