import React from "react";
import LeftMenu from "../../components/dashboard/shared/LeftMenu";
import Topbar from "../../components/dashboard/shared/Topbar";
import AddStudentsMarksEntryForm from "../../components/dashboard/admin/AddStudentsMarksEntryForm";

const AddStudentMarks: React.FC = () => {
  return (
    <div className="container mx-auto mt-5">
      {/* Topbar */}
      <div className="absolute top-0 w-full z-10">
        <Topbar title="Add Student's Marks" />
      </div>

      <div className="flex">
        {/* Left Menu */}
        <LeftMenu />

        {/* Main Content */}
        <div className="mx-auto w-full md:w-2/3 lg:w-1/2">
          <div className="bg-white shadow-md rounded-lg p-8">
            {/* Add Students Marks Entry Form */}
            <AddStudentsMarksEntryForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudentMarks;
