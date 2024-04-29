import React from "react";
import LeftMenu from "../../components/dashboard/shared/LeftMenu";
import Topbar from "../../components/dashboard/shared/Topbar";

import BackButton from "../../components/BackButton";
import AddSubjectForm from "../../components/dashboard/admin/AddSubjectForm";

const AddSubject: React.FC = () => {
  return (
    <div className="container mx-auto mt-5">
      <div className="top-0 z-0">
        <Topbar title="Admin Dashboard" />
      </div>
      <div className="flex">
        <LeftMenu />
        <div className="mx-auto">
          <BackButton />
          <AddSubjectForm />
        </div>
      </div>
    </div>
  );
};

export default AddSubject;
