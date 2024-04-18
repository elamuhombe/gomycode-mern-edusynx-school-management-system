import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Features,
  Register,
  Contact,
  Login,
  FAQ,
  Documentation,
  AdminDashboard,
  EnrollmentOfficerDashboard,
  AccountantDashboard,
  HeadTeacherDashboard,
  TeacherDashboard,
  AddClass,
  AddStudent,
  ViewClass,
  AddSubject,
  AddUser,
} from "./pages/index";

import { GlobalStateProvider } from "./hooks/useGlobalContext";
import ViewStudents from "./pages/Students/ViewStudents";
import ViewUser from "./pages/dashboard/ViewUser";

const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <Router>
        <div className="m-4 font-sans">
          <Routes>
            <Route path="/add/add-user" element={<AddUser />} />
            <Route path="/add/add-subject" element={<AddSubject />} />
            <Route path="/view/view-class" element={<ViewClass />} />
            <Route path="/add/add-student" element={<AddStudent />} />
            <Route path="/add/add-class" element={<AddClass />} />
            <Route path="/view/view-users" element={<ViewUser />} />
            <Route path="/ViewStudents" element={<ViewStudents />} />

            <Route
              path="/dashboard/accountant"
              element={<AccountantDashboard />}
            />
            <Route
              path="/dashboard/enrollment-officer"
              element={<EnrollmentOfficerDashboard />}
            />
            <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
            <Route
              path="/dashboard/headteacher"
              element={<HeadTeacherDashboard />}
            />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/features" element={<Features />} />
            <Route path="/support/FAQ" element={<FAQ />} />
            <Route path="/support/Documentation" element={<Documentation />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </GlobalStateProvider>
  );
};

export default App;
