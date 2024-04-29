// Importing necessary modules from React and react-icons, and react-router-dom
import React, { useState } from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { useGlobalState } from "../../../hooks/useGlobalContext";
import useUserAuth from "../../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";

// Interface for props passed to Topbar component
interface TopbarProps {
  title: string;
}

// Topbar component
const Topbar: React.FC<TopbarProps> = ({ title }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown menu visibility
  const { state } = useGlobalState();
  const { users } = state;

  // Fetching logged-in user from global state based on email
  const loggedInUser = users.find((user) => user.email === "admin@example.com"); // Change email to match logged-in user

  // Function to toggle dropdown menu visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Fetching user authentication status and navigation function
  const userAuth = useUserAuth();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white text-gray-500 w-full max-w-1000">
      <div>{title}</div>
      <div className="flex items-center">
        <div className="mr-4">
          <FaBell className="icon" />
        </div>
        <div className="profile-icon relative" onClick={toggleDropdown}>
          <FaUser className="icon" />
          {dropdownOpen && (
            <div className="dropdown-menu absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded shadow-md p-8 w-56">
              <ul>
                {/* {loggedInUser && <li>Logged in as: {loggedInUser.name}</li>} */}
                <li>Props</li>
                <li>Settings</li>
                <li
                  onClick={() => {
                    userAuth.logoutUser();
                    navigate("/");
                  }}>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
