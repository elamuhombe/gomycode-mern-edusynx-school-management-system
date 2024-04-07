import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LeftMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems = [
    { name: "Finance", submenus: ["Add Expense", "Delete Expense"] },
    { name: "Students", submenus: ["Add Student", "Delete Student"] },
    { name: "Teachers", submenus: ["Add Teacher", "Delete Teacher"] },
    { 
      name: "Reports", 
      submenus: [
        "Students Reports", 
        "Teachers Reports", 
        "Accounts Report"
      ] 
    },
    { name: "Parents", submenus: ["Add Parent", "Delete Parent"] },
    { name: "Head Teacher", submenus: ["Add Head Teacher", "Delete Head Teacher"] },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setActiveMenu(null);
  };

  const toggleSubmenu = (menuName: string) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Aside Menu */}
      <aside className={`bg-gray-800 w-64 h-full fixed overflow-y-auto ease-in-out transition-all duration-300 z-30 ${isOpen ? 'translate-x-0' : '-translate-x-64'}`}>
        {/* Menu content */}
        <div className="py-4 px-6">
          {/* Your menu items */}
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="text-white py-2">
                <div className="flex justify-between items-center">
                  <span>{item.name}</span>
                  {item.submenus && (
                    <button onClick={() => toggleSubmenu(item.name)} className="focus:outline-none">
                      {activeMenu === item.name ? <FaChevronUp className="text-white" /> : <FaChevronDown className="text-white" />}
                    </button>
                  )}
                </div>
                {activeMenu === item.name && (
                  <ul>
                    {item.submenus.map((submenu, subIndex) => (
                      <li key={subIndex} className="text-white py-2 pl-4">
                        <Link to={`/reports/${submenu.toLowerCase().replace(/\s+/g, "-")}`}>{submenu}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            {/* Add more menu items as needed */}
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
