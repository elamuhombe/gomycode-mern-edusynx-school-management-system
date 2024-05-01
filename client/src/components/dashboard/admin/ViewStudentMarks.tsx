import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ISubject } from "../../../types";

const AddStudentMarksTotal: React.FC = () => {
  const [studentMarksList, setStudentMarksList] = useState<any[]>([]);
  const [studentNames, setStudentNames] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Fetch student marks data
        const marksResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/getAllMarks`
        );
        if (!marksResponse.ok) {
          throw new Error("Failed to fetch student marks");
        }
        const marksData = await marksResponse.json();
        setStudentMarksList(marksData);

        // Fetch student names data
        const namesResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/getAllStudentNames`
        );
        if (!namesResponse.ok) {
          throw new Error("Failed to fetch student names");
        }
        const namesData = await namesResponse.json();
        const studentNamesMap: { [key: string]: string } = {};
        namesData.forEach((student: { _id: string; fullName: string }) => {
          studentNamesMap[student._id] = student.fullName;
        });
        setStudentNames(studentNamesMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentData();
  }, []);

  // Function to calculate total marks for a student
  const calculateTotalMarks = (
    marks: { subjectName: string; marks: number }[]
  ) => {
    return marks.reduce((acc, curr) => acc + curr.marks, 0);
  };

  // Function to generate PDF
  const generatePDF = () => {
    const input = document.getElementById("student-marks-table") as HTMLElement;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("student-marks.pdf");
    });
  };

  // Extract unique subject names from the data
  const subjects = [
    ...new Set(
      studentMarksList.flatMap((student) =>
        student.subjectMarks.map((subject: any) => subject.subjectName)
      )
    ),
  ];

  // Sort student marks list by total marks
  const sortedStudentMarksList = studentMarksList.slice().sort((a, b) => {
    const totalMarksA = calculateTotalMarks(a.subjectMarks);
    const totalMarksB = calculateTotalMarks(b.subjectMarks);
    return totalMarksB - totalMarksA;
  });

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Student Marks</h2>
      <button
        onClick={generatePDF}
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Download PDF
      </button>
      <table
        id="student-marks-table"
        className="w-full table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Student Name</th>
            {subjects.map((subject, index) => (
              <th key={index} className="px-4 py-2">
                {subject}
              </th>
            ))}
            <th className="px-4 py-2">Total Marks</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudentMarksList.map((studentMark, studentIndex) => (
            <tr key={studentIndex}>
              <td className="border px-4 py-2">{studentIndex + 1}</td>
              <td className="border px-4 py-2">
                {studentNames[studentMark.studentId]}
              </td>
              {subjects.map((subject, subjectIndex) => {
                const marks = studentMark.subjectMarks.find(
                  (item:ISubject) => item.subject_name === subject
                );
                return (
                  <td key={subjectIndex} className="border px-4 py-2">
                    {marks ? marks.marks : 0}
                  </td>
                );
              })}
              <td className="border px-4 py-2">
                {calculateTotalMarks(studentMark.subjectMarks)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddStudentMarksTotal;
