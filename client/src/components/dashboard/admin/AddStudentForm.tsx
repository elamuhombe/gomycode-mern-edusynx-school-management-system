import React, { useState, useEffect } from "react";
import { IClass } from "../../../types";
import { useGlobalState } from "../../../hooks/useGlobalContext";
import { useSubmitForm } from "../../../hooks/hooks";
import { useLocation } from "react-router-dom";
import LeftMenu from "../shared/LeftMenu";
import Swal from "sweetalert2";

const AddStudentForm: React.FC = () => {
  const { state } = useGlobalState();
  const { submitForm } = useSubmitForm();
  const [birthDate, setBirthDate] = useState(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    return formattedDate;
  });
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [formData, setFormData] = useState({
    id: "",
    _id: "",
    school: "",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    role: "",
    clas: "",
    password: "",
    familyNumber: "",
    schoolClass: "",
    teachingSubjects: [],
    isClassTeacher: false,
    studentFirstName: "",
    studentLastName: "",
    studentGender: "",
    previousSchool: "",
    dateOfBirth: "",
    guardians: [],
    className: "",
    year: undefined,
  });
  const location = useLocation();
  const guardians = location.state && location.state.guardian;
  const extractedFamilyNumber = guardians?.familyNumber ?? null;
  console.log(extractedFamilyNumber);

  useEffect(() => {
    fetchData();
    if (guardians) {
      setFormData({
        ...formData,
        guardians: [],
      });
    }
  }, [guardians]);

  const [classes, setClasses] = useState<IClass[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const classesResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/class`
      );

      if (!classesResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const classesData = await classesResponse.json();

      setClasses(classesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

    const selectedClassObject = classes.find(
      (classObj) => classObj.className === selectedClass
    );

    if (!selectedClassObject) {
      Swal.fire("Selected class not found");
      return;
    }

    const studentData = {
      ...selectedFormData,
      clas: selectedClassObject._id,
    };

    try {
      const result = await submitForm(
        `${import.meta.env.VITE_API_URL}/student`,
        "POST",
        studentData
      );

      if (result && result.message) {
        Swal.fire(result.message);
      } else {
        Swal.fire("Student created successfully");
        console.log("Successfully created student:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
        </div>
      </form>
    </div>
  );
};

export default AddStudentForm;

