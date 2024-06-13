import React from "react";
import Header from './../components/shared/Header/Header'; // Importing Header component
import { Footer } from "../components"; // Importing Footer component
import { TextField, Select, MenuItem } from "@mui/material"; // Importing necessary MUI components
// import CTAButton from "../components/shared/CTAButton"; // Importing CTAButton component

const Register: React.FC = () => { // Functional component Register
  return (
    <div className="flex flex-col"> {/* Main container */}
      <Header /> {/* Rendering Header component */}
      <div className="flex flex-col items-center justify-center h-screen"> {/* Form container */}
        <form className="w-full max-w-sm mb-48"> {/* Form */}
          <h3 className="text-xl font-600">Register</h3> {/* Form title */}
          <p>Please fill out the registration form below.</p> {/* Form description */}
          <div className="flex flex-col w-full gap-4"> {/* Form fields */}
            <div className="w-full">
              <TextField
                id="schoolName"
                label="School Name"
                variant="standard"
              />
            </div>
            <div className="w-full">
              <TextField
                id="phoneNumber"
                label="Phone Number"
                variant="standard"
              />
            </div>
            <div className="w-full">
              <TextField
                id="emailAddress"
                label="Email Address"
                variant="standard"
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row w-full gap-4"> {/* City and Country selectors */}
            <Select
              id="city"
              label="City"
              variant="standard"
              className="md:w-1/2"
            >
              <MenuItem value="Nairobi">Nairobi</MenuItem>
              <MenuItem value="Mombasa">Mombasa</MenuItem>
              <MenuItem value="Kisumu">Kisumu</MenuItem>
              <MenuItem value="Eldoret">Eldoret</MenuItem>
              <MenuItem value="Nakuru">Kisumu</MenuItem> 
          
            </Select>
            <Select
              id="country"
              label="Country"
              variant="standard"
              defaultValue="Kenya" // Set Kenya as default
              className="md:w-1/2"
            >
              <MenuItem value="Kenya">Kenya</MenuItem> {/* Default country */}
              {/* Add more countries as needed */}
            </Select>
          </div>
          {/* 
        <div className="text-center">
          <CTAButton text="Register"  />
        </div> 
      */}
        </form>
      </div>
      <Footer /> {/* Rendering Footer component */}
    </div>
  );
};

export default Register; // Exporting Register component
