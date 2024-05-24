import React, { useEffect, useState } from "react";
import { IAttendance, IClass, IStudent } from "../../../types/index";
import Papa from "papaparse";
import Swal from "sweetalert2";

const ViewAttendanceData: React.FC = () => {
  // State variables
  const [attendanceRecords] = useState<IAttendance[]>([]);
  const itemsPerPage = 10; // Define items per page here
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(attendanceRecords.length / itemsPerPage);
  const [filterClassName, setFilterClassName] = useState("");
  // const {data:fetchedClassesAndStudents} = useFetch(`${
  //   import.meta.env.VITE_API_URL
  // }/classes/students/66102f52be0ff3f4365350c5`)
  const [classStudentsData, setClassStudentsData] = useState<{
    students: IStudent[];
    classes: IClass[];
  }>({ students: [], classes: [] });

  const [classId, setClassId] = useState<string | null>(null);
  const [createdAttendanceData, setCreatedAttendanceData] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<IClass | null>(null);

const  date = new Date().toLocaleDateString("en-US",{ year: 'numeric', month: 'long', day: 'numeric' });

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
    setCreatedAttendanceData(attendances);
  };
  const filteredRecords = filterClassName
    ? attendanceRecords.filter(
        (record) =>
          (record.class as IClass).className.toLowerCase() ===
          filterClassName.toLowerCase()
      )
    : attendanceRecords;


   
  //  if (data){
  //   setClassStudentsData(data)
  //  }
    // useEffect(()=>{
    //   console.log(createdAttendanceData[0])
    // },[createdAttendanceData])
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
    

    fetchData();
  }, [classStudentsData]);

 

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterClassName(event.target.value);
    setClassId(event.target.value)
    handleClassSelect(event.target.value)
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

  const handleAttendanceSubmit = async(event: React.MouseEvent<HTMLButtonElement>)=>{
    const postData = {classId, date, studentAttendances:createdAttendanceData}
   event.preventDefault()
   
    const request = await fetch(`${
        import.meta.env.VITE_API_URL
      }/attendance`,{
        method: 'POST',
        body: JSON.stringify(postData),
        headers:{
          "content-type": "application/json"
        }
      })
      if(!request.ok){
          return Swal.fire("error","could not save the attendance")
      }
      let data = await request.json()
      console.log({data})
  }

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
            <option key={index} value={_class?._id}>
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
        <button
          className="ml-4 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
          onClick={handleAttendanceSubmit}>
         Update Attendance
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
          {createdAttendanceData
            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
            .map((record, index) => (
              <tr key={`${index}`}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {index + 1 + currentPage * itemsPerPage}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {selectedClass?.className}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {date}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {`${(record.student as IStudent).studentFirstName} ${
                    (record.student as IStudent).studentLastName
                  }`}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }} >
                  <button onClick ={(e:React.MouseEvent<HTMLButtonElement>)=>{
                  setCreatedAttendanceData(prev=>{
                    let updated = prev
                    updated[index].isPresent = !prev[index].isPresent
                    console.log({updated})
                    return updated
                  })
                }}>
                    {record.isPresent ? "Present" : "Absent"}
                  </button>
                
                </td>
              </tr>
            ))}
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
