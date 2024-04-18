import React from "react";
import LeftMenu from "../../components/dashboard/shared/LeftMenu";
import Topbar from "../../components/shared/Topbar";

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
          <h2 className="mt-4 mb-4 text-xl">Add Subject</h2>
          <AddSubjectForm
          
                      onSubmit={function (subjectData: any): void {
                          throw new Error("Function not implemented.");
                      } }
                      teachers={[]}
                      classes={[]} streams={[]}          />{" "}
        </div>
      </div>
    </div>
  );
};

export default AddSubject;
