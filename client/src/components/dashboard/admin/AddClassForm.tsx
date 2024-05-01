import React, { useState } from "react";
import { useSubmitForm } from "./../../../hooks/hooks";
import { useGlobalState } from "../../../hooks/useGlobalContext";
import { IClass } from "../../../types";

// Define FormData type as IClass
type FormData = IClass;

// AddClassForm component
const AddClassForm: React.FC = () => {
  const { state } = useGlobalState(); // Get global state
  const { submitForm } = useSubmitForm(); // Get submit form function from custom hook

  // Initial form state
  const [formData, setFormData] = useState<FormData>({
    className: "",
    school: state.loggedInUser?._id || "", // Set school to logged in user's id if available
    year: 0,
  });

  const { className, year } = formData; // Destructure form data

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Submit form data
      const result = await submitForm(
        `${import.meta.env.VITE_API_URL}/class`,
        "POST",
        { ...formData, school: state.loggedInUser?._id } // Include logged in user's id in form data
      );
      if (result && result.message) {
        console.error("Error:", result.message);
      } else {
        console.log("Successfully created class:", result);

        // Reset form data to default values
        setFormData({
          className: "",
          school: "",
          year: 0,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Get input name and value
    setFormData({
      ...formData,
      [name]: value, // Update form data with new input value
    });
  };

  //Render form
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-600">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Class</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Class Name:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="className"
          value={className}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Class Year:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text" // Change input type to text
          name="year"
          value={year}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">
          Add Class
        </button>
      </div>
    </form>
  );
};

export default AddClassForm;
