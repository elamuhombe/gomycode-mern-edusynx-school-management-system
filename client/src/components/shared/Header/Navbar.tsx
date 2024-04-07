import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiChevronDown } from 'react-icons/bi'; // Import the BiChevronDown icon

const Navbar: React.FC = () => {
  // State variables for managing navbar and dropdown visibility
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle navbar visibility
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
    setIsDropdownOpen(false); // Close the dropdown when hamburger menu is clicked
  };

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Define array of links with their respective URLs
  const links = [
    { text: 'Home', url: '/' },
    { text: 'Features', url: '/Features' }, // Corrected URL for Services
    { text: 'Contact Us', url: '/ContactUs' },
    { text: 'Register', url: '/Register' },
    { text: 'Login', url: '/Login' },
  ];

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Hamburger Menu Button */}
          <button onClick={toggleNavbar} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded={isNavbarOpen ? "true" : "false"}>
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>

          {/* Navbar Links */}
          <div className={`transition-all duration-300 ease-in-out w-full md:block md:w-auto ${isNavbarOpen ? 'block' : 'hidden'}`} id="navbar-dropdown">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {/* Mapping through links array */}
              {links.map((link, index) => (
                <li key={index}>
                  {/* Link Component */}
                  <Link to={link.url} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">{link.text}</Link>
                </li>
              ))}
              {/* Dropdown Menu */}
              <li>
                <div className="relative">
                  {/* Dropdown Toggle Button */}
                  <button onClick={toggleDropdown} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent focus:outline-none flex items-center">
                    Help And Support
                    <BiChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  {/* Dropdown Menu Items */}
                  <ul className={`absolute top-full left-0 mt-2 w-48 rounded-lg bg-white border border-gray-200 shadow-lg ${isDropdownOpen ? 'block' : 'hidden'}`}>
                    <li>
                      <Link to="/support/Faq" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">FAQ</Link>
                    </li>
                    <li>
                      <Link to="/support/Documentation" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Documentation</Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
