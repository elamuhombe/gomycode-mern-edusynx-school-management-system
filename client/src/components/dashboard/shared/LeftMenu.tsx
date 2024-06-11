// Importing necessary modules from React and react-icons, and react-router-dom
import React, { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaBook,
  FaMoneyCheckAlt,
  FaUserGraduate,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { MdSubject } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../hooks/useGlobalContext";
import useUserAuth from "../../../hooks/useUserAuth";

// Interface for each menu item
interface MenuItem {
  name: string;
  icon?: React.ReactNode;
  submenus?: string[];
  action?: () => void;
  viewers?: string[];
}
// Array to define menu items accessible by different user roles
const viewerLinks = [
  { key: "accountant", value: ["Accounts", "Users", "Logout"] },
  { key: "enrollmentOfficer", value: ["Students", "Users"] },
  { key: "guardian", value: ["Reports"] },
  { key: "teacher", value: ["Classes", "Subjects"] },
  { key: "headteacher", value: ["Classes", "Subjects", "Exams", "Attendance"] },
];

// LeftMenu component
const LeftMenu: React.FC = () => {
    // Fetching user data and authentication status
  let {
    state: { loggedInUser },
  } = useGlobalState();
  const [isOpen, setIsOpen] = useState(false); // State to track menu open/close
  const [activeMenu, setActiveMenu] = useState<string | null>(null); // State to track active menu item
  const navigate = useNavigate(); // Navigate function from react-router-dom
  const userAuth = useUserAuth();  // User authentication hook

  // Effect to update logged in user data if it's not present and user is authenticated
useEffect(() =>{
  if (!loggedInUser && userAuth.isLoggedIn) {
    loggedInUser = userAuth.savedUser;
  }
},[loggedInUser,userAuth])

  // Menu items with their names, icons, submenus, and actions
  const menuItems: MenuItem[] = [
    {
      name: "Accounts",
      icon: <FaMoneyCheckAlt />,
      submenus: ["Add Expense", "View Expense"],
    },
    {
      name: "Students",
      icon: <FaUserGraduate />,
      submenus: ["View Student"],
    },
    {
      name: "Classes",
      icon: <FaBook />,
      submenus: ["Add Class", "View Class"],
    },
    {
      name: "Subjects",
      icon: <MdSubject />,
      submenus: ["Add Subject", "View Subject"],
    },
    {
      name: "Reports",
      icon: <FaChartBar />,
      submenus: ["Students Reports", "Teachers Reports", "Accounts Report"],
    },
    { name: "Exams", icon: <FaUser />, submenus: ["Add Exam", "View Exam","Add Students Marks Entry", "View Student Total Marks"] },
    {
      name: "Attendance",
      icon: <FaUser />,
      submenus: ["View Attendance"],
    },
    { name: "Users", icon: <FaUser />, submenus: ["Add User", "View Users"] },
    { name: "Logout", action: () => handleLogout() }, // Added Logout item
  ];

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setActiveMenu(null);
  };
 // Function to toggle sub menu visibilty
  const toggleSubmenu = (menuName: string) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

 // Function to handle logout action
  function handleLogout() {
    userAuth.logoutUser();
    // Redirect to login page after logout
    navigate("/");
  }

  return (
    <>
      <div className="flex h-screen bg-gray-200 w-1/5">
        {/* Aside Menu */}
        <aside
          className={`bg-gray-800 w-64 h-full fixed overflow-y-auto ease-in-out transition-all duration-300 z-30 ${
            isOpen ? "translate-x-0" : "-translate-x-64"
          }`}>
          {/* Menu content */}
          <div className="py-4 px-6">
            {/* Your menu items */}
            <ul>
              {menuItems
                .filter((item: MenuItem) => {
                  if (
                    ["admin", "headteacher"].includes(
                      loggedInUser?.role as string
                    )
                  )
                    return item;
                  let links =
                    viewerLinks.find(
                      (val) => val.key == (loggedInUser?.role as string)
                    ) || null;
                  if (links?.value.includes(item.name)) return item;
                })
                .map((item, index) => (
                  <li key={index} className="text-white py-2">
                    <div className="flex">
                      {item.action && ( // Check if action is defined
                        <button
                          onClick={item.action}
                          className="focus:outline-none ml-auto">
                          {item.name === "Logout" && (
                            <FaSignOutAlt className="text-white" />
                          )}{" "}
                          {/* Render logout icon */}
                        </button>
                      )}
                      {item.icon && <span className="mr-2">{item.icon}</span>}
                      <span>{item.name}</span>

                      {item.submenus !== undefined && (
                        <button
                          onClick={() => toggleSubmenu(item.name)}
                          className="focus:outline-none">
                          {activeMenu === item.name ? (
                            <FaChevronUp className="text-white" />
                          ) : (
                            <FaChevronDown className="text-white" />
                          )}
                        </button>
                      )}
                    </div>
                    {activeMenu === item.name &&
                      item.submenus !== undefined && (
                        <ul>
                          {item.submenus.map((submenu, subIndex) => (
                            <li key={subIndex} className="text-white py-2 pl-4">
                              <Link
                                to={`/${
                                  submenu.toLowerCase().includes("add")
                                    ? "add"
                                    : "view"
                                }/${submenu
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}>
                                {submenu}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
            </ul>
          </div>
        </aside>

        {/* Toggle Button */}
        <div className="flex justify-start bg-gray-700 p-4">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none">
            {/* Toggle button icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default LeftMenu;
