import React, { useState } from "react";
import { ISubject } from "../../../types";
import { useGlobalState } from "../../../hooks/useGlobalContext";
import useSubmitForm from "../../../hooks/useSubmitForm";

// Define the structure of form data based on ISubject type
type FormData = ISubject;

// Component for adding a new subject
const AddSubjectForm: React.FC = () => {
  const { state } = useGlobalState();
  const { submitForm } = useSubmitForm();

  // Initialize form data state
  const [formData, setFormData] = useState<FormData>({
    id: undefined,
    _id: undefined,
    subject_name: "",
    schoolClass: "",
    department: "",
    school: state.loggedInUser ? state.loggedInUser._id || "" : "",
  });

  // Handler for input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Submit form data to the server
      const result = await submitForm("http://localhost:5100/subject", "POST", {
        ...formData,
        school: state.loggedInUser?._id,
      });
      if (result && result.message) {
        console.error("Error:", result.message);
      } else {
        console.log("Successfully created subject:", result);
        // Reset form data to default values
        setFormData({
          id: "",
          _id: "",
          subject_name: "",
          department: "",
          schoolClass: "",
          school: state.loggedInUser ? state.loggedInUser._id || "" : "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xs mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Subject</h2>

      <div className="mb-4">
        <label
          htmlFor="subject_name"
          className="block text-gray-700 text-sm font-bold mb-2">
          Subject Name:
        </label>
        <input
          type="text"
          id="subject_name"
          name="subject_name"
          value={formData.subject_name}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="department"
          className="block text-gray-700 text-sm font-bold mb-2">
          Department:
        </label>
        <textarea
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add Subject
        </button>
      </div>
    </form>
  );
};

export default AddSubjectForm;
