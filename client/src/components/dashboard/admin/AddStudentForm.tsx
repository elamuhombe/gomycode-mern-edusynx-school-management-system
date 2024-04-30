import React, { useState, useEffect } from "react";
import { IClass, IStudent } from "../../../types";
import { useGlobalState } from "../../../hooks/useGlobalContext";
import { useSubmitForm } from "../../../hooks/hooks";
import { useLocation } from "react-router-dom";
import LeftMenu from "../shared/LeftMenu";
import Swal from "sweetalert2";

interface AddStudentFormProps {
  onClose: () => void; // onClose performs an action but doesn't return any specific value
  familyNumber: number;
  guardians: string[];
}

// Define the functional component
const AddStudentForm: React.FC<AddStudentFormProps> = ({
  onClose,
  familyNumber,
  guardians,
}) => {
  // State and logic here
  const { state } = useGlobalState();
  const { submitForm } = useSubmitForm();
  // Update the initial state for birthDate
  const [birthDate, setBirthDate] = useState(() => {
    // Create a new Date object with the current date
    const currentDate = new Date();
    // Format the date as "yyyy-MM-dd"
    const formattedDate = currentDate.toISOString().split("T")[0];
    // Return the formatted date as the initial state
    return formattedDate;
  });
  const [selectedClass, setSelectedClass] = useState<string>("");

  const [formData, setFormData] = useState({
    // IUser Interface
    id: "",
    _id: "",
    school: "",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    role: "",
    password: "",
    familyNumber: "",
    schoolClass: "",
    teachingSubjects: [],
    isClassTeacher: false,

    //IStudent
    studentFirstName: "",
    studentLastName: "",
    studentGender: "",
    previousSchool: "",
    dateOfBirth: "",
    guardians: [],

    //IClass Interface
    className: "",
    year: undefined,
  });
  let location = useLocation();
  console.log({ "location is": location });

  guardians = location.state && location.state.guardian;
  // Access familyNumber from guardian object
  const extractedFamilyNumber = guardians?.familyNumber ?? null;
  console.log(extractedFamilyNumber);

  useEffect(() => {
    fetchData();
    if (guardians) {
      // Extract guardian data and set to form state
      setFormData({
        ...formData,
        guardians: [],
        // Populate familyNumber if available
        //familyNumber: initialFamilyNumber !== null ? initialFamilyNumber.toString() : "",
        // Other fields can be set based on guardianData
      });
    }
  }, [guardians]);

  const [classes, setClasses] = useState<IClass[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const classesResponse = await fetch("http://localhost:5100/class");

      if (!classesResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const classesData = await classesResponse.json();

      setClasses(classesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Select only the properties you need
  const selectedFormData = {
    studentFirstName: formData.studentFirstName,
    studentLastName: formData.studentLastName,
    studentGender: formData.studentGender,
    dateOfBirth: birthDate,
    previousSchool: formData.previousSchool,
    schoolClass: formData.schoolClass,
    className: formData.className,
    familyNumber:
      extractedFamilyNumber !== null
        ? extractedFamilyNumber.toString()
        : undefined,
    school: state.loggedInUser?._id,
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await submitForm("http://localhost:5100/student", "POST", {
        ...selectedFormData,
        school: state.loggedInUser?._id,
      });

      if (result && result.message) {
        Swal.fire(result.message);
        //console.error("Error:", result.message);
      } else {
        Swal.fire("student created successfully");
        console.log("Successfully created student:", result);
        // Reset form data to default values
        const setSelectedFormData = {
          studentFirstName: "",
          studentLastName: "",
          dateOfBirth: "",
          studentGender: "",
          previousSchool: "",
          className: "",
          guardians: [], // Provide an appropriate value for guardians
          familyNumber:
            extractedFamilyNumber !== null
              ? extractedFamilyNumber.toString()
              : undefined,
          schoolClass: "",
          school: "", // Provide a value for school
        };
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof IStudent
  ) => {
    setFormData({
      ...formData,
      [field]: new Date(e.target.value),
    });
  };

  const handleClose = () => {
    onClose();
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleClassSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClassName = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      className: selectedClassName,
    }));
    setSelectedClass(selectedClassName);
  };

  return (
    <div className="flex  items-center h-screen mt-12">
      <LeftMenu />
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md ml-32 rounded px-8 pt-6 pb-8 mb-4 max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Student</h2>

        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-gray-700 text-sm font-bold mb-2">
            First Name:
          </label>
          <input
            type="text"
            id="studentFirstName"
            name="studentFirstName"
            value={selectedFormData.studentFirstName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-gray-700 text-sm font-bold mb-2">
            Last Name:
          </label>
          <input
            type="text"
            id="studentLastName"
            name="studentLastName"
            value={selectedFormData.studentLastName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
          />
        </div>
        <div>
          <label>
            Birth Date:
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </label>
        </div>

        <div className="mb-4">
          <label
            htmlFor="studentGender"
            className="block text-gray-700 text-sm font-bold mb-2">
            Gender:
          </label>
          <select
            id="studentGender"
            name="studentGender"
            value={selectedFormData.studentGender}
            onChange={handleSelectChange}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg w-full">
            <option value="">Select Gender</option>
            <option value="boy">Boy</option>
            <option value="girl">Girl</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="previousSchool"
            className="block text-gray-700 text-sm font-bold mb-2">
            Previous School:
          </label>
          <input
            type="text"
            id="previousSchool"
            name="previousSchool"
            value={selectedFormData.previousSchool}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
          />
        </div>

        <div className="mb-4 flex-end">
          <label
            htmlFor="Class"
            className="block text-gray-700 text-sm font-bold mb-2">
            Class:
          </label>
          <select
            value={selectedClass}
            onChange={handleClassSelectChange}
            className="w-full px-4 py-2 border rounded-md">
            <option value="">Select a Class</option>
            {classes.map((classItem) => (
              <option key={classItem.className} value={classItem.className}>
                {classItem.className}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
            Close
          </button>
        </div>
      </form>
    </div>
  );

  return null;
};
export default AddStudentForm;
