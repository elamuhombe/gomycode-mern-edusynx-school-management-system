import React from "react";
import LeftMenu from "../../components/dashboard/shared/LeftMenu";
import Topbar from "../../components/shared/Topbar";
import BackButton from "../../components/BackButton";
import AddClassForm from "../../components/dashboard/admin/AddClassForm";

const AddClass: React.FC = () => {
  return (
    <div className="container mx-auto mt-5">
      <div className="top-0 z-0">
        <Topbar title="Admin Dashboard" />
      </div>
      <div className="flex">
        <LeftMenu />
        <div className="mx-auto">
          <BackButton />
          <AddClassForm />
        </div>
      </div>
    </div>
  );
};

export default AddClass;
