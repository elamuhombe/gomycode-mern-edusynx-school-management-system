import React, { useState } from "react";
import { IUser } from "../../../types";
import { useGlobalState } from "../../../hooks/useGlobalContext";
import useSubmitForm from "../../../hooks/useSubmitForm";

type FormData = IUser;

const AddUserForm: React.FC = () => {
  const { state} = useGlobalState();
  const { submitForm } = useSubmitForm();
  const [isChecked, setIsChecked] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    id: undefined,
    _id: undefined,
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    role: "",
    familyNumber: "",
    isClassTeacher: false,
    school: state.loggedInUser?._id || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type} = e.target;
  
    // Log the family number entered
    if (name === 'familyNumber') {
      console.log('Family Number:', value);
    }
  
    // Update form data
    setFormData(prevState => {
    
      const updatedState = {
        ...prevState,
        [name]: type === 'checkbox' ? isChecked : value,
        // Reset familyNumber if the role changes
        //familyNumber: name === 'role' && value !== 'guardian' ? "" : prevState.familyNumber,
      };
      console.log('Updated state:', updatedState);
      return updatedState;
    });
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    try {
      const result = await submitForm("http://localhost:5100/user", "POST", {
        ...formData,
        school: state.loggedInUser?._id,
      });
      if (result && result.message) {
        console.error("Error:", result.message);
      } else {
        console.log("Successfully created user:", result);
        // Reset form data to default values
        setFormData({
          id: undefined,
          _id: undefined,
          firstName: "",
          lastName: "",
          gender: "",
          email: "",
          role: "",
          school: "",
          familyNumber:"",
          isClassTeacher: false,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setFormData(prevState => ({
      ...prevState,
      isClassTeacher: !isChecked,
    }));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 shadow-md rounded-md ml-28">
      <h2 className="text-lg font-semibold mb-4">Add User Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block mb-1">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block mb-1">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block mb-1">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block mb-1">
            Role:
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="accountant">Accountant</option>
            <option value="enrollmentOfficer">Enrollment Officer</option>
            <option value="teacher">Teacher</option>
            <option value="headteacher">Head Teacher</option>
            <option value="guardian">Guardian</option>
          </select>
        </div>
        {/* Conditionally render family number field if role is "Guardian" */}
        {formData.role === "guardian" && (
          <div className="mb-4">
            <label htmlFor="familyNumber" className="block mb-1">
              Family Number:
            </label>
            <input
              type="text"
              id="familyNumber"
              name="familyNumber"
              value={formData.familyNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        )}
        {/* Conditionally render isClassTeacher checkbox if role is "Teacher" */}
        {formData.role === "teacher" && (
          <div className="mb-4">
            <label className="block mb-1">Is Class Teacher?</label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">Yes</span>
            </label>
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
