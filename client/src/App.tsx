import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Features, Register, Contact, Login, FAQ, Documentation, AdminDashboard,
  EnrollmentOfficerDashboard, ParentDashboard, AccountantDashboard, HeadTeacherDashboard,
  TeacherDashboard,
  AddTeacher} from './pages/index';

import { GlobalStateProvider } from "./hooks/useGlobalContext";
import ViewStudents from "./pages/Students/ViewStudents";

const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <Router>
        <div className="m-4 font-sans">
          <Routes>
          <Route path="/AddTeacher" element={<AddTeacher />} />
            <Route path="/ViewStudents" element={<ViewStudents />} />
            <Route path="/dashboard/parent" element={<ParentDashboard />} />
            <Route path="/dashboard/accountant" element={<AccountantDashboard />} />
            <Route path="/dashboard/enrollment-officer" element={<EnrollmentOfficerDashboard />} />
            <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
            <Route path="/dashboard/headteacher" element={<HeadTeacherDashboard />} />
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
