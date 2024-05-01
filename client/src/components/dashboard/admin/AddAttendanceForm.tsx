import React, { useState } from "react";
import {
  IAttendance,
  IStudent,
  IClass,
  IStudentAttendance,
} from "../../../types/index";
import useSubmitForm from "./../../../hooks/useSubmitForm";

interface Props {
  classes: IClass[] | [];
  students: IStudent[] | [];
}
const AddAttendanceForm: React.FC<Props> = ({ classes, students }) => {
  const [classId, setClassId] = useState("");
  const [date, setDate] = useState("");
  const [studentAttendances, setStudentAttendances] = useState<
    IStudentAttendance[]
  >([]); // Use IStudentAttendance interface
  const { isLoading, error } = useSubmitForm();

  // Function to handle class selection
  const handleClassSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClassId(e.target.value);
  };

  // Function to add or toggle student attendance
  const handleAddStudentAttendance = (student: IStudent) => {
    // console.log(
    //   "Adding attendance for student:",
    //   student.studentFirstName,
    //   student.studentLastName
    // );
    console.log({student})
    return 
    // Check if the student's attendance already exists
    const existingIndex = studentAttendances.findIndex(
      (item) =>
        (item.student as IStudent)._id as string == student._id as string
    );
    if (existingIndex !== -1) {
      // If attendance exists, toggle the isPresent value
      const updatedAttendances = [...studentAttendances];
      updatedAttendances[existingIndex] = {
        // studentName: `${student.studentFirstName} ${student.studentLastName}`,
        student:student,
        isPresent: !updatedAttendances[existingIndex].isPresent,

      };

      setStudentAttendances(updatedAttendances);
    } else {
      // If attendance doesn't exist, add a new entry
      const newAttendance = {
        studentName: `${student.studentFirstName} ${student.studentLastName}`,
        isPresent: true,
      };

      setStudentAttendances((prevState: any) => [...prevState, newAttendance]);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare attendance data to be submitted
    const attendanceData: IAttendance = {
      class: classId,
      date,
      studentAttendances,
    };

    try {
      // Send attendance data to the server
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/attendance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attendanceData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to submit attendance: ${response.status}`);
      }

      // Clear the fields
      setClassId("");
      setDate("");
      setStudentAttendances([]);
    } catch (error) {
      console.error("Error submitting attendance:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Add Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="classId" className="block mb-2">
            Select Class:
          </label>
          <select
            id="classId"
            value={classId}
            onChange={handleClassSelect}
            className="w-full px-4 py-2 border rounded-md">
            <option value="">Select a class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.className}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block mb-2">
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Student Attendances:</h3>
          {classId && (
            <table className="w-full border border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {students
                  .filter((student) => student.className === classId)
                  .map((student, index) => (
                    <tr key={student._id}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{`${student.studentFirstName} ${student.studentLastName}`}</td>
                      <td className="border px-4 py-2">
                        <input
                          type="checkbox"
                          checked={studentAttendances.some(
                            (item) =>
                              (item.student as IStudent)._id ===
                                student._id &&
                              item.isPresent
                          )}
                          onChange={() => handleAddStudentAttendance(student)}
                          className="form-checkbox h-4 w-4 text-indigo-600 border-indigo-600 rounded"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Submit
        </button>
        {error && <p className="text-red-600 mt-2">Error: {error}</p>}
      </form>
    </div>
  );
};

export default AddAttendanceForm;
