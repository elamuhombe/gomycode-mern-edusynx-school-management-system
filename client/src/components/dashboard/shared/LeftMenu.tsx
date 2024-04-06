import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaSignOutAlt } from 'react-icons/fa';
import { Link} from 'react-router-dom';

const LeftMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);
  const [isStudentsOpen, setIsStudentsOpen] = useState(false);
  const [isTeachersOpen, setIsTeachersOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isParentsOpen, setIsParentsOpen] = useState(false);
  const [isHeadTeacherOpen, setIsHeadTeacherOpen] = useState(false);



  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleFinanceMenu = () => {
    setIsFinanceOpen(!isFinanceOpen);
  };

  const toggleStudentsMenu = () => {
    setIsStudentsOpen(!isStudentsOpen);
  };

  const toggleTeachersMenu = () => {
    setIsTeachersOpen(!isTeachersOpen);
  };

  const toggleReportsMenu = () => {
    setIsReportsOpen(!isReportsOpen);
  };

  const toggleParentsMenu = () => {
    setIsParentsOpen(!isParentsOpen);
  };

  const toggleHeadTeacherMenu = () => {
    setIsHeadTeacherOpen(!isHeadTeacherOpen);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear session data, etc.
    console.log('Logged out...');

  
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Aside Menu */}
      <aside className={`bg-gray-800 w-64 h-full fixed overflow-y-auto ease-in-out transition-all duration-300 z-30 ${isOpen ? 'translate-x-0' : '-translate-x-64'}`}>
        {/* Menu content */}
        <div className="py-4 px-6">
          {/* Your menu items */}
          <ul>
            <li className="text-white py-2">DashBoard</li>
            <li className="text-white py-2 flex justify-between" onClick={toggleStudentsMenu}>
              Students
              {isStudentsOpen ? (
                <FaChevronLeft className="text-white ml-2" onClick={toggleStudentsMenu} />
              ) : (
                <FaChevronRight className="text-white ml-2" onClick={toggleStudentsMenu} />
              )}
            </li>
            {isStudentsOpen && (
              <ul>
                <li className="text-white py-2 pl-4">
              {/* Link to ViewStudents */}
              <Link to="/ViewStudents">View Students</Link>
            </li>
                <li className="text-white py-2 pl-4">Add Student</li>
                {/* Add more student-related options as needed */}
              </ul>
            )}
            <li className="text-white py-2 flex justify-between" onClick={toggleTeachersMenu}>
              Teachers
              {isTeachersOpen ? (
                <FaChevronLeft className="text-white ml-2" onClick={toggleTeachersMenu} />
              ) : (
                <FaChevronRight className="text-white ml-2" onClick={toggleTeachersMenu} />
              )}
            </li>
            {isTeachersOpen && (
              <ul>
                <li className="text-white py-2 pl-4">View Teachers</li>
                <li className="text-white py-2 pl-4">Add Teacher</li>
                {/* Add more teacher-related options as needed */}
              </ul>
            )}
            <li className="text-white py-2 flex justify-between" onClick={toggleFinanceMenu}>
              Finance
              {isFinanceOpen ? (
                <FaChevronLeft className="text-white ml-2" onClick={toggleFinanceMenu} />
              ) : (
                <FaChevronRight className="text-white ml-2" onClick={toggleFinanceMenu} />
              )}
            </li>
            {isFinanceOpen && (
              <ul>
                <li className="text-white py-2 pl-4">Accounts</li>
                <li className="text-white py-2 pl-4">Expenses</li>
                {/* Add more finance-related options as needed */}
              </ul>
            )}
            <li className="text-white py-2 flex justify-between" onClick={toggleReportsMenu}>
              Reports
              {isReportsOpen ? (
                <FaChevronLeft className="text-white ml-2" onClick={toggleReportsMenu} />
              ) : (
                <FaChevronRight className="text-white ml-2" onClick={toggleReportsMenu} />
              )}
            </li>
            {isReportsOpen && (
              <ul>
                <li className="text-white py-2 pl-4">Financial Reports</li>
                <li className="text-white py-2 pl-4">Attendance Reports</li>
                {/* Add more report-related options as needed */}
              </ul>
            )}
            <li className="text-white py-2 flex justify-between" onClick={toggleParentsMenu}>
              Parents
              {isParentsOpen ? (
                <FaChevronLeft className="text-white ml-2" onClick={toggleParentsMenu} />
              ) : (
                <FaChevronRight className="text-white ml-2" onClick={toggleParentsMenu} />
              )}
            </li>
            {isParentsOpen && (
              <ul>
                <li className="text-white py-2 pl-4">View Parents</li>
                <li className="text-white py-2 pl-4">Add Parent</li>
                {/* Add more parent-related options as needed */}
              </ul>
            )}
            <li className="text-white py-2 flex justify-between" onClick={toggleHeadTeacherMenu}>
              Head Teacher
              {isHeadTeacherOpen ? (
                <FaChevronLeft className="text-white ml-2" onClick={toggleHeadTeacherMenu} />
              ) : (
                <FaChevronRight className="text-white ml-2" onClick={toggleHeadTeacherMenu} />
              )}
            </li>
            {isHeadTeacherOpen && (
              <ul>
                <li className="text-white py-2 pl-4">View Head Teacher</li>
                <li className="text-white py-2 pl-4">Assign Tasks</li>
                {/* Add more head teacher-related options as needed */}
              </ul>
            )}
            <li className="text-white py-2 flex justify-between" onClick={handleLogout}>
        <Link to="/login" className="flex items-center">
          Logout
          <FaSignOutAlt className="text-white ml-2" />
        </Link>
      </li>
          </ul>
        </div>
      </aside>

      {/* Toggle Button */}
      <div className="flex justify-start bg-gray-700 p-4">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {/* Toggle button icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LeftMenu;
