import React from "react";

import Topbar from "../../components/dashboard/shared/Topbar";
import LeftMenu from "../../components/dashboard/shared/LeftMenu";
import BackButton from "../../components/BackButton";
import ViewAttendanceData from "../../components/dashboard/admin/ViewAttendanceData";

const ViewAttendance: React.FC = () => {
  return (
    <div className="container mx-auto mt-5">
      <div className="top-0 z-0">
        <Topbar title="Admin Dashboard" />
      </div>
      <div className="flex">
        <LeftMenu />
        <div className="mx-auto">
          <BackButton />
          <ViewAttendanceData />{" "}
        </div>
      </div>
    </div>
  );
};
export default ViewAttendance;
