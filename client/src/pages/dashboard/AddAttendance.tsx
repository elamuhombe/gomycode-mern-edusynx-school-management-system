import React, { useState, useEffect } from 'react';
import Topbar from "../../components/dashboard/shared/Topbar"
import LeftMenu from "../../components/dashboard/shared/LeftMenu"
import AddAttendanceForm from "../../components/dashboard/admin/AddAttendanceForm";
import BackButton from "../../components/BackButton";


const AddAttendance: React.FC = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classesResponse = await fetch('http://localhost:5100/class'); // Adjust URL as per your backend API
        const studentsResponse = await fetch('http://localhost:5100/student'); // Adjust URL as per your backend API
        
        if (!classesResponse.ok || !studentsResponse.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const classesData = await classesResponse.json();
        const studentsData = await studentsResponse.json();
        
        setClasses(classesData);
        setStudents(studentsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
 

  return (
    <div className="container mx-auto mt-5">
      <div className="top-0 z-0">
        <Topbar title="Admin Dashboard" />
      </div>
      <div className="flex">
        <LeftMenu />
        <div className="mx-auto">
          <BackButton />
          <h2 className="font-bold">Add Attendance</h2>
          {loading ? (
        <p>Loading...</p>
      ) : (
        <AddAttendanceForm classes={classes} students={students} attendance={null} />
      )}

        </div>
      </div>
    </div>
  );
}

  
export default AddAttendance;
