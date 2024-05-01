import React, { useEffect, useState } from "react";
import LeftMenu from "../../components/dashboard/shared/LeftMenu";
import Topbar from "../../components/dashboard/shared/Topbar";
import Card from "../../components/dashboard/shared/cards/Card";
// import GenderBarChart from "../../components/dashboard/admin/charts/GenderBarChart";
import { useGlobalState } from "../../hooks/useGlobalContext";
import useUserAuth from "../../hooks/useUserAuth";
import StudentCards from "../../components/dashboard/shared/cards/StudentCard";
// import GuardiansCards from "../../components/dashboard/shared/cards/GuardiansCard";
// import TeacherCards from "../../components/dashboard/shared/cards/TeacherCards";
//import StudentGenderPieChart from "../../components/dashboard/shared/cards/studentGenderPieChart"
import useFetch from "../../hooks/useFetch";

const AdminDashboard: React.FC = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { state } = useGlobalState();
  const userAuth = useUserAuth();
  const [dashboardData] = useState({
    numTeachers: 0,
    numStudents: 0,
    numGuardians: 0,
  });
  let loggedInUser = state.loggedInUser || userAuth.savedUser;
  //const {school} = loggedInUser
  console.log({ Dashboard: { loggedInUser, savedUser: userAuth.savedUser } });
  const { data: dbData = dashboardData } = useFetch(
    `${API_URL as string}/api/dashboard/${loggedInUser?.school as string}`
  );

  // if(dbData) setDashboardData(dbData)
  useEffect(() => {
    if (!loggedInUser && userAuth.isLoggedIn) {
      loggedInUser = userAuth.savedUser;
    }
    console.log(loggedInUser);
  }, [loggedInUser, userAuth]);
  console.log({ "logged In User": loggedInUser });

  return (
    <div className="bg-gray-200">
      {/*<h2>{loggedInUser?.name || 'no user'}</h2>*/}

      <div className="top-0 z-0">
        <Topbar title="Admin Dashboard" />
      </div>
      <div className="flex justify-between">
        {loggedInUser && <LeftMenu />}{" "}
        {/* Render LeftMenu only when loggedInUser is truthy */}
        {/* <div className="flex flex-wrap justify-center ml-40"> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  my-8 mx-24 flex-grow text-center">
          <Card
            title="Students"
            description={<StudentCards data={dbData?.numStudents || 0} />}
          />
          <Card
            title="Teachers"
            description={<StudentCards data={dbData?.numTeachers || 0} />}
          />
          <Card
            title="Parents"
            description={<StudentCards data={dbData?.numGuardians || 0} />}
          />
          <Card title="Total Income" description="800,000" />
          {/* <StudentGenderPieChart /> */}
          {/* Pass the required props to GenderBarChart */}
          {/* <GenderBarChart /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
