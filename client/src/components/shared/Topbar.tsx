import React, { useState } from 'react';
import { FaBell, FaUser } from 'react-icons/fa';
import { useGlobalState } from '../../context/useGlobalState';

interface TopbarProps {
  title: string;
}

const Topbar: React.FC<TopbarProps> = ({ title }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { state } = useGlobalState();
  const { users } = state;
  const loggedInUser = users.find(user => user.email === 'admin@example.com'); // Change email to match logged-in user
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white text-gray-500 w-full max-w-1000">
      <div>
        {title}
      </div>
      <div className="flex items-center">
        <div className="mr-4">
          <FaBell className="icon" />
        </div>
        <div className="profile-icon relative" onClick={toggleDropdown}>
          <FaUser className="icon" />
          {dropdownOpen && (
            <div className="dropdown-menu absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded shadow-md p-8 w-56">
              <ul>
                {loggedInUser && <li>Logged in as: {loggedInUser.name}</li>}
                <li>Props</li>
                <li>Settings</li>
                <li>Initials</li>
              </ul>
            </div>
          )}
        </div>
      </div>
     
    </div>
  );
};

export default Topbar;