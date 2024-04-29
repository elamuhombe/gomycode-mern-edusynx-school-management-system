import React from "react";
import Topbar from "../../components/dashboard/shared/Topbar";
import LeftMenu from "../../components/dashboard/shared/LeftMenu";
import BackButton from "../../components/BackButton";
import AttendanceForm from "../../components/dashboard/admin/AddAttendanceForm";

const AddAttendance: React.FC = () => {
  return (
    <div className="container mx-auto mt-5">
      <div className="top-0 z-0">
        <Topbar title="Admin Dashboard" />
      </div>
      <div className="flex">
        <LeftMenu />
        <div className="mx-auto">
          <BackButton />
          <h1 className="text-2xl font-bold mb-5">Add Attendance</h1>
          {/* Uncomment the following line to include the AddStudentForm component */}
          <AttendanceForm students={[]} />
        </div>
      </div>
    </div>
  );
};

export default AddAttendance;
