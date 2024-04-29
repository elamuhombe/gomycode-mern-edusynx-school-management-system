import React from "react";
import Topbar from "../../components/dashboard/shared/Topbar";
import LeftMenu from "../../components/dashboard/shared/LeftMenu";
import BackButton from "../../components/BackButton";
//import AddStudentForm from '../../components/dashboard/admin/AddStudentForm'; // uncomment this line to import AddStudentForm

const AddStudent: React.FC = () => {
  return (
    <div className="container mx-auto mt-5">
      <div className="top-0 z-0">
        <Topbar title="Admin Dashboard" />
      </div>
      <div className="flex">
        <LeftMenu />
        <div className="mx-auto">
          <BackButton />
          <h1 className="text-2xl font-bold mb-5">Add Student</h1>
          {/* <AddStudentForm /> */}
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
