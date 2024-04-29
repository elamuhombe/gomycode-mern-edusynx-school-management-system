import React from "react";
import LeftMenu from "../../components/dashboard/shared/LeftMenu";
import Topbar from "../../components/dashboard/shared/Topbar";
import Card from "../../components/dashboard/shared/cards/Card";
import { useGlobalState } from "../../hooks/useGlobalContext";

const EnrollmentOfficerDashboard: React.FC = () => {
  const { state } = useGlobalState();

  return (
    <div className="bg-gray-200">
      <h2>{state.loggedInUser?.name || "No user"}</h2>
      <div className="top-0 z-0">
        <Topbar title="Enrollment Officer Dashboard" />
      </div>
      <div className="flex">
        <LeftMenu />
        <div className="flex flex-wrap justify-center ml-40">
          <Card
            title="New Applications"
            description="View and process new student applications."
          />
          <Card
            title="Enrolled Students"
            description="Manage enrolled student records."
          />
          <Card
            title="Admissions"
            description="Handle admissions processes and documentation."
          />
          <Card
            title="Reports"
            description="Generate enrollment-related reports."
          />
        </div>
      </div>
    </div>
  );
};

export default EnrollmentOfficerDashboard;
