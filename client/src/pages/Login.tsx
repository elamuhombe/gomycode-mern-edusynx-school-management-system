import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/shared/Header/Header";
import { useUserAuth } from "./../hooks/hooks"; // Import useGlobalState
import { useGlobalState } from "../hooks/useGlobalContext";
import { ISchool } from "../types";
import Swal from "sweetalert2";

const userDashboard = [
  { role: "admin", path: "/dashboard/admin" },
  { role: "enrollmentOfficer", path: "/dashboard/enrollment-officer" },
  { role: "accountant", path: "/dashboard/accountant" },
  { role: "headteacher", path: "/dashboard/headteacher" },
  { role: "teacher", path: "/dashboard/teacher" },
];

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const userAuth = useUserAuth();

  const { dispatch, state } = useGlobalState(); // Destructure dispatch and state from useGlobalState
  let loggedInUser = userAuth.savedUser as ISchool;

  useEffect(() => {
    if (userAuth.isLoggedIn) {
      if (location.state && location.state.from) {
        //navigate(location.state.from, { replace: true, state: location.state });
      } else {
        //navigate("/");
      }
      navigate(
        userDashboard.find((val) => val.role === (loggedInUser.role as string))
          ?.path as string
      );
    }
  }, [userAuth.isLoggedIn, location.state, navigate]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log({ username, password });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      const data = await response.json();
      let userData = data.accountDetails.school
        ? data.accountDetails
        : { ...data.accountDetails, school: data.accountDetails._id };
      // Update user in global state
      if (!data.accountDetails || !userData)
        throw Error("An error has occcured");
      dispatch({
        type: "UPDATE_USER",
        payload: {
          ...state.loggedInUser,
          ...userData,
        },
      });
      userAuth.loginUser(userData);
      Swal.fire("Logged in successfully");

      // Redirect to admin dashboard
      //navigate("/dashboard/admin");
      navigate(
        userDashboard.find((val) => val.role === (userData.role as string))
          ?.path as string
      );
    } catch (error) {
      Swal.fire("Invalid login details");
      console.error("Error occurred:", error);
    }
  };

  const usernameEntered = username.trim() !== "";
  const passwordEntered = password.trim() !== "";

  const handleResetPassword = () => {
    navigate("/reset-password");
  };

  return (
    <div className="flex flex-col ">
      <Header />
      <div className="flex flex-col items-center justify-center h-screen">
        <form onSubmit={(e) => handleLogin(e)} className="w-full max-w-sm mb-8">
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full border border-gray-400 p-2 ${
                usernameEntered ? "bg-blue-50" : ""
              }`}
              autoComplete="username"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border border-gray-400 p-2 ${
                passwordEntered ? "bg-blue-50" : ""
              }`}
              autoComplete="current-password" // Add autocomplete attribute
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-400 text-white py-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
        <p>
          <button
            onClick={handleResetPassword}
            className="text-blue-500 underline">
            Forgot your password?
          </button>
        </p>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
