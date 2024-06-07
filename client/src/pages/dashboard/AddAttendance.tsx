import React, { useState, useEffect } from "react";
import Topbar from "../../components/dashboard/shared/Topbar";
import LeftMenu from "../../components/dashboard/shared/LeftMenu";
import AddAttendanceForm from "../../components/dashboard/admin/AddAttendanceForm";
import BackButton from "../../components/BackButton";

const AddAttendance: React.FC = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchData = await fetch(
          `${import.meta.env.VITE_API_URL}/classes/students/66102f52be0ff3f4365350c5`
        ); 
        const classesResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/class`
        ); // Adjust URL as per your backend API
        const studentsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/student`
        ); // Adjust URL as per your backend API

        if (!fetchData.ok) {
          throw new Error("Failed to fetch data");
        }

        const classesData = await classesResponse.json();
        const studentsData = await studentsResponse.json();
        const {classes, students} = await fetchData.json();
        setClasses(classesData|| []);
        setStudents(studentsData || []);
        console.log({classes, students})
        setLoading(false);
      } catch (error) {
        alert('error occured')
        console.error("Error fetching data:", error);
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
          <h2 className="font-bold">Add Attendances</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AddAttendanceForm
              classes={classes}
              students={students}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddAttendance;
