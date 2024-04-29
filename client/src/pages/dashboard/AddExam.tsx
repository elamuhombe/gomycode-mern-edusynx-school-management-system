import React from "react";
import LeftMenu from "../../components/dashboard/shared/LeftMenu";
import Topbar from "../../components/dashboard/shared/Topbar";
import AddExamEntryForm from "../../components/dashboard/admin/AddExamEntryForm";

const AddExam: React.FC = () => {
  return (
    <div className="container mx-auto mt-5">
      {/* Topbar */}
      <div className="top-0 z-10">
        <Topbar title="Admin Dashboard" />
      </div>

      {/* Content */}
      <div className="flex">
        {/* Left Menu */}
        <LeftMenu />

        {/* Main Content */}
        <div className="mx-auto">
          {/* Add Exam Entry Form */}
          <AddExamEntryForm />
        </div>
      </div>
    </div>
  );
};

export default AddExam;
