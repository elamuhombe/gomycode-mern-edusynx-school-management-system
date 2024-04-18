import React from "react";
import Topbar from "../../components/shared/Topbar";
import LeftMenu from "../../components/dashboard/shared/LeftMenu";
import BackButton from "../../components/BackButton";

import AddUserForm from "../../components/dashboard/admin/AddUserForm";

const AddUser: React.FC = () => {
  return (
    <div className="container mx-auto mt-5">
      <div className="top-0 z-0">
        <Topbar title="Admin Dashboard" />
      </div>
      <div className="flex">
        <LeftMenu />
        <div className="ml-60">
          <BackButton />
        </div>

        <AddUserForm />
      </div>
    </div>
  );
};
export default AddUser;
