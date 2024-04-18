import React from 'react';
import LeftMenu from "../../components/dashboard/shared/LeftMenu";
import Topbar from "../../components/shared/Topbar";
import Card from "../../components/dashboard/shared/cards/Card";
import { useGlobalState } from '../../hooks/useGlobalContext';

const HeadTeacherDashboard: React.FC = () => {
  const { state } = useGlobalState();

  return (
    <div className="bg-gray-200">
      <h2>{state.loggedInUser?.name || 'No user'}</h2>
      <div className="top-0 z-0">
        <Topbar title="HeadTeacher Dashboard" />
      </div>
      <div className="flex">
        <LeftMenu />
        <div className="flex flex-wrap justify-center ml-40">
          <Card title="Classrooms" description="View and manage classrooms." />
          <Card title="Teachers" description="Manage teacher assignments and schedules." />
          <Card title="Students" description="View and manage student information." />
          <Card title="Reports" description="Generate and view various reports." />
        </div>
      </div>
    </div>
  );
};

export default HeadTeacherDashboard;
