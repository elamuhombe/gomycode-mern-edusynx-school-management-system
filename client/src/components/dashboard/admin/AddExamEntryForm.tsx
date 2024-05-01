import React, { useState } from "react";
import Swal from "sweetalert2";

// Functional component for adding exam entry

const AddExamEntryForm: React.FC = () => {
  // State variables for exam name and date
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");

  // Function to handle changes in exam name input
  const handleExamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExamName(event.target.value);
  };

  // Function to handle changes in exam date input
  const handleExamDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExamDate(event.target.value);
  };

  // Function to handle changes in exam date input
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Send POST request to add exam in backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/exam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ examName, examDate }),
      });
      console.log(examDate);
      if (!response.ok) {
        throw new Error("Failed to add exam");
      }

      // Clear form fields upon successful submission
      setExamName("");
      setExamDate("");
      // Show success dialog
      Swal.fire({
        icon: "success",
        title: "Exam Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      // Optionally, you can handle success or redirect to another page
    } catch (error) {
      console.error("Error adding exam:", error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Exam Name */}
      <div>
        <label htmlFor="examName" className="block mb-1">
          Exam Name
        </label>
        <input
          type="text"
          id="examName"
          value={examName}
          onChange={handleExamNameChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter exam name"
          required
        />
      </div>

      {/* Exam Date */}
      <div>
        <label htmlFor="examDate" className="block mb-1">
          Exam Date
        </label>
        <input
          type="date"
          id="examDate"
          value={examDate}
          onChange={handleExamDateChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Add Exam
        </button>
      </div>
    </form>
  );
};

export default AddExamEntryForm;
