import React from "react";
import LeftMenu from "../../components/dashboard/shared/LeftMenu";
import Topbar from "../../components/dashboard/shared/Topbar";
import Card from "../../components/dashboard/shared/cards/Card";
// import GenderBarChart from "../../components/dashboard/admin/charts/GenderBarChart";
import { useGlobalState } from "../../hooks/useGlobalContext";

const TeacherDashboard: React.FC = () => {
  const { state } = useGlobalState();

  return (
    <div className="bg-gray-200">
      <h2>{state.loggedInUser?.name || "no user"}</h2>
      <div className="top-0 z-0">
        <Topbar title="TeacherDashboard" />
      </div>
      <div className="flex">
        <LeftMenu />
        <div className="flex flex-wrap justify-center ml-40">
          <Card title="Students" description="" />
          <Card title="Upcoming Events" description="" />
          <Card title="Attendance" description="" />
          <Card title="Resources" description="" />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
