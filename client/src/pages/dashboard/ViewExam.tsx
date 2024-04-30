import React from "react";
import ViewExamData from "./../../components/dashboard/admin/ViewExamData";
import BackButton from "../../components/BackButton";
import LeftMenu from "../../components/dashboard/shared/LeftMenu";
import Topbar from "../../components/dashboard/shared/Topbar";

const ViewExam: React.FC = () => {
  return (
    <div className="container mx-auto mt-5">
      <div className="top-0 z-0">
        <Topbar title="Admin Dashboard" />
      </div>
      <div className="flex">
        <LeftMenu />
        <div className="mx-auto">
          <BackButton />
          <ViewExamData />
        </div>
      </div>
    </div>
  );
};
export default ViewExam;
