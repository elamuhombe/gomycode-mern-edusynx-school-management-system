import React, { useState, useEffect } from "react";
import useSubmitForm from "./../../../hooks/useSubmitForm";
import { useGlobalState } from "../../../hooks/useGlobalContext";
import { IStudent, IClass } from "../../../types";


type FormData = IStudent & IClass;

const AddStudentForm: React.FC<{ onClose: () => void; familyNumber: string | null }> = ({ onClose, familyNumber }) => {
  // Your component code here
  const { state } = useGlobalState();
  const { submitForm } = useSubmitForm();
  const [guardianFamilyNumber, setGuardianFamilyNumber] = useState<string | null>(null); // State to store selected guardian's family number
  

  //const currentDate: Date = new Date();
//const dateString: string = currentDate.toISOString();


  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    gender: "",
    school: '',
    previousSchool: "",
    className: "", // Ensure it's initialized correctly
    registrationDate: new Date(),
    guardians: [], // Ensure it's initialized correctly
    schoolClass: "", // Add this property from ISchoolClass
    year: 0,
  
  });
  
  // Select only the properties you need
  const selectedFormData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    dateOfBirth: formData.dateOfBirth,
    gender: formData.gender,
    previousSchool: formData.previousSchool,
    registrationDate: formData.registrationDate,
    guardians: formData.guardians as string[], // Explicitly type as string[]
    className: formData.className,
    schoolClass: formData.schoolClass
  };
  useEffect(() => {
    if (familyNumber !== null) {
      console.log("Guardian Family Number:", familyNumber);
    }
  }, [familyNumber]);

  //usage of guardianFamilyNumber
  useEffect(() => {
    if (guardianFamilyNumber !== null) {
      console.log("Guardian Family Number:", guardianFamilyNumber);
    }
  }, [guardianFamilyNumber]);

  const [classes, setClasses] = useState<IClass[]>([]); // Rename to 'classes'

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
    // Update dateOfBirth field with the selected date
    setFormData({
      ...formData,
      [field]: new Date(e.target.value), // Convert the selected date string to a Date object
    });
  };
  
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await submitForm(
        "http://localhost:5100/student",
        "POST",
        { ...selectedFormData, school: state.loggedInUser?._id }
      );
      if (result && result.message) {
        console.error("Error:", result.message);
      } else {
        console.log("Successfully created student:", result);
        // Reset form data to default values
        setFormData({
          firstName: "",
          lastName: "",
          dateOfBirth: new Date(),
          gender: "",
          previousSchool: "",
          className: "",
          registrationDate: new Date(),
          guardians: [],
          schoolClass: "",
          year: 0,
          school: ""
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = () => {
    // Call onClose function to close the form
    onClose();
  };


  return (
    <div className="flex justify-center items-center h-screen mt-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md"
      >
         <div>
          <label htmlFor="guardian">Select Guardian:</label>
          <select id="guardian" name="guardian" required>
            <option value="">Select Guardian</option>
            {familyNumber && (
              <option key={familyNumber} value={familyNumber}>
                {familyNumber}
              </option>
            )}
          </select>


        </div>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={selectedFormData.firstName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={selectedFormData.lastName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
          />
        </div>
        <div>
        <label htmlFor="registrationDate" className="block text-gray-700 text-sm font-bold mb-2">
            Date Of Birth:
            <input
  type="date"
  id="dateOfBirth"
  name="dateOfBirth"
  value={selectedFormData.dateOfBirth.toISOString().substr(0, 10)} // Convert Date to string
  onChange={(e) => handleDateChange(e, 'dateOfBirth')}
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
/>

          </label>
        </div>
       
        <div className="mb-4">
          <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={selectedFormData.gender}
            onChange={handleSelectChange}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg w-full"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="previousSchool" className="block text-gray-700 text-sm font-bold mb-2">
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
        <div className="mb-4">
          <label htmlFor="registrationDate" className="block text-gray-700 text-sm font-bold mb-2">
            Registration Date:
          </label>
          <input
            type="date"
            id="registrationDate"
            name="registrationDate"
            value={selectedFormData.registrationDate.toISOString().substr(0, 10)} // Convert Date to string
            onChange={(e) => handleDateChange(e, 'registrationDate')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
          />
        </div>
        
       
        <div className="mb-4">
          <label htmlFor="schoolClass" className="block text-gray-700 text-sm font-bold mb-2">
            School Class:
          </label>
          <select
            id="schoolClass"
            name="schoolClass"
            value={selectedFormData.className} // Assuming 'id' is the appropriate property
            onChange={handleSelectChange}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg w-full"
          >
            <option value="">Select School Class</option>
            {classes.map((schoolClass) => (
              <option key={schoolClass.className} value={schoolClass.className}>
                {schoolClass.className}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentForm;