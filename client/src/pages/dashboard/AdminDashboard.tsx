import React from 'react'
import LeftMenu from "../../components/dashboard/shared/LeftMenu";
import Topbar from "../../components/shared/Topbar";
import Card from "../../components/dashboard/shared/cards/Card";
import GenderBarChart from "../../components/dashboard/admin/charts/GenderBarChart";



const AdminDashboard: React.FC = () => {


 
  return (
    <div className="bg-gray-200">
      <div className="top-0 z-0">
        <Topbar title="Admin Dashboard" />
      </div>
      <div className="flex">
        <LeftMenu />
        
        <div className="flex flex-wrap justify-center ml-40">
          <Card title="Students" description="30,000" />
          <Card title="Teachers" description="400" />
          <Card title="Parents" description="48,000" />
          <Card title="Total Income" description="800,000" />
          <Card title="Students Gender Data" description="">
            {/* Pass the required props to GenderBarChart */}
            <GenderBarChart girlsData={18000} boysData={12000} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;