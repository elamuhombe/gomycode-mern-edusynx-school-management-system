import React, { useState } from 'react';
import useSubmitForm from "./../../../hooks/useSubmitForm";
import { useGlobalState } from "../../../hooks/useGlobalContext";
import { IClass } from "../../../types";

type FormData = IClass;

const AddClassForm: React.FC = () => {
  const { state } = useGlobalState();
  const { submitForm } = useSubmitForm();

  const [formData, setFormData] = useState<FormData>({
    className: '',
    school: state.loggedInUser?._id  ||"",
    year: 0
  });

  const { className, year } = formData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await submitForm(
        "http://localhost:5100/class",
        "POST",
        { ...formData, school: state.loggedInUser?._id }
      );
      if (result && result.message) {
        console.error("Error:", result.message);
      } else {
        console.log("Successfully created class:", result);
        // Reset form data to default values
        setFormData({
          className: "",
          school: "",
          year: 0 
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-600">
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
          type="submit"
        >
          Add Class
        </button>
      </div>
    </form>
  );
};

export default AddClassForm;