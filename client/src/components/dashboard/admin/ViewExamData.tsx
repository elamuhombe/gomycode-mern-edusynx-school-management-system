import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ViewExamData: React.FC = () => {
  const [exams, setExams] = useState<any[]>([]);

  useEffect(() => {
    // Fetch exams data from backend
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      // Attempt to fetch exams data
      const response = await fetch("http://localhost:5100/exam", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Check if the response is successful
      if (!response.ok) {
        // Throw an error if response is not ok
        throw new Error("Failed to fetch exams");
      }
      // Extract data from response
      const examsData = await response.json();
      setExams(examsData);
    } catch (error) {
      // Display SweetAlert for error handling
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to fetch exams. Please try again later.",
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">View Exam Data</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Exam Name
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {index + 1}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {exam.examName}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {exam.examDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewExamData;
