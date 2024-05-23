import React, { useEffect, useState } from "react";
import { IAttendance, IClass, IStudent } from "../../../types/index";
import Papa from "papaparse";

const ViewAttendanceData: React.FC = () => {
  // State variables
  const [attendanceRecords, setAttendanceRecords] = useState<IAttendance[]>([]);
  const itemsPerPage = 10; // Define items per page here
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(attendanceRecords.length / itemsPerPage);
  const [filterClassName, setFilterClassName] = useState("");
  const [classStudentsData, setClassStudentsData] = useState<{
    students: IStudent[];
    classes: IClass[];
  }>({ students: [], classes: [] });
  const [createdAttendanceData, setCreatedAttendanceData] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<IClass | null>(null);
  // Extract unique class names from attendance records
  const classNames = Array.from(
    new Set(
      attendanceRecords.map((record) => (record.class as IClass).className)
    )
  );
  const handleClassSelect = (clas: string) => {
    setSelectedClass(
      classStudentsData?.classes.find((c) => c._id === clas) || null
    );
    const attendances = classStudentsData.students
      .filter((s) => s.clas === clas)
      .map((stud) => {
        return {
          student: stud,
          isPresent: false,
        };
      });
      setCreatedAttendanceData(attendances)
  };
  const filteredRecords = filterClassName
    ? attendanceRecords.filter(
        (record) =>
          (record.class as IClass).className.toLowerCase() ===
          filterClassName.toLowerCase()
      )
    : attendanceRecords;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/classes/students/66102f52be0ff3f4365350c5`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch attendance records");
        }
        const data = await response.json();
        setClassStudentsData(data);
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      }
    };
    //Fetch attendance records from the backend API
    const fetchAttendanceRecords = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/attendance/view-attendance`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch attendance records");
        }
        const data = await response.json();
        setAttendanceRecords(data);
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterClassName(event.target.value);
    setCurrentPage(0); // Reset to first page when filter changes
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Function to export data to CSV
  const exportToCSV = () => {
    const csvData = [];
    csvData.push(["Class Name", "Date", "Student Name", "Presence"]);

    filteredRecords.forEach((record) => {
      record.studentAttendances.forEach((attendance) => {
        csvData.push([
          (record.class as IClass).className,
          record.date,
          attendance.student,
          attendance.isPresent ? "Present" : "Absent",
        ]);
      });
    });

    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "attendance_records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Attendance Records
      </h2>

      <div className="mb-4">
        <label htmlFor="classNameFilter" className="italic mr-4">
          Filter by Class Name:
        </label>
        <select
          id="classNameFilter"
          value={filterClassName}
          onChange={handleFilterChange}>
          <option value="">All Classes</option>
          {classStudentsData?.classes.map((_class, index) => (
            <option key={index} value={_class.className}>
              {_class.className}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 mb-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={exportToCSV}>
          Export to CSV
        </button>
      </div>
      <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Index</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Class Name
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Date</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Student Name
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Presence
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords
            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
            .map((record, index) =>
              record.studentAttendances.map((attendance, attendanceIndex) => (
                <tr key={`${index}-${attendanceIndex}`}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {index + currentPage * itemsPerPage}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {(record.class as IClass).className}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {record.date}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {`${(attendance.student as IStudent).studentFirstName} ${
                      (attendance.student as IStudent).studentLastName
                    }`}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {attendance.isPresent ? "Present" : "Absent"}
                  </td>
                </tr>
              ))
            )}
        </tbody>
      </table>
      <div className="mt-4">
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          Previous
        </button>
        <span>{`Page ${currentPage + 1} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewAttendanceData;
