import React, {useState } from "react";
import { IUser } from "../../../types";
import { useGlobalState } from "../../../hooks/useGlobalContext";
import { useSubmitForm } from "../../../hooks/hooks";


const AddUserForm: React.FC = () => {
  const { submitForm } = useSubmitForm();
  const [isChecked] = useState(false);




  // const {
  //   state: { loggedInUser },
  // } = useGlobalState();
  //const state = useGlobalState()
  const { state } = useGlobalState(); // Destructure state directly
  const loggedInUser = state.loggedInUser; // Extract loggedInUser

  const [formData, setFormData] = useState<IUser>({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    role: "",
    familyNumber: "",
    school: loggedInUser?._id || "",
  });

  // Select only the properties you need
  const selectedFormData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    gender: formData.gender,
    email: formData.email,
    role: formData.role,
    familyNumber: formData.familyNumber,
    //schoolClass: formData.schoolClass,
    school: loggedInUser?._id,
  };
 
 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    // Log the family number entered
    if (name === "familyNumber") {
      console.log("Family Number:", value);
    }

    // Update form data
    setFormData((prevState) => {
      const updatedState = {
        ...prevState,
        [name]: type === "checkbox" ? isChecked : value,
        // Reset familyNumber if the role changes
        //familyNumber: name === 'role' && value !== 'guardian' ? "" : prevState.familyNumber,
      };
      console.log("Updated state:", updatedState);
      return updatedState;
    });
  };

  // const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedRole = event.target.value;
  //   setFormData({
  //     ...formData,
  //     role: selectedRole,
  //     teachingSubjects: selectedRole === 'teacher' ? [] : formData.teachingSubjects, // Reset teachingSubjects if role changes to 'student'
  //   });
  //   // Show teaching subjects multi-select if role is 'teacher'
  //   setShowTeachingSubjects(selectedRole === 'teacher');
  // };

  // const handleTeachingSubjectsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedSubjectIds = Array.from(event.target.selectedOptions, option => option.value);
  //   const selectedSubjects = selectedSubjectIds.map(subjectId => {
  //     const subject = subjects.find(subject => subject._id === subjectId);
  //     return subject ? subject.subject_name : ''; // Return subject_name if found, otherwise empty string
  //   });
  //   setFormData(prevFormData => ({
  //     ...prevFormData,
  //     teachingSubjects: selectedSubjects,
  //   }));
  // };

  // const addSubject = () => {
  //   if (selectedSubject && !selectedSubjects.includes(selectedSubject)) {
  //     setSelectedSubjects([...selectedSubjects, selectedSubject]);
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       teachingSubjects: [...prevFormData.teachingSubjects, selectedSubject],
  //     }));
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    try {
      const result = await submitForm(
        `${import.meta.env.VITE_API_URL}/user`,
        "POST",
        {
          ...formData,
          school: state?.loggedInUser?._id || "",
        }
      );
      if (result && result.message) {
        console.error("Error:", result.message);
      } else {
        console.log("Successfully created user:", result);
        // Reset form data to default values
        setFormData({
          firstName: "",
          lastName: "",
          gender: "",
          email: "",
          role: "",
          school: "",
          familyNumber: "",
          className: "",
          isClassTeacher: false,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  console.log(formData);
  return (
    <div className="max-w-xl max-w-md mx-auto mt-8 p-6 bg-gray-100 shadow-md rounded-md ml-28 mr-40">
      <h2 className="text-lg font-semibold mb-4">Add User Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6">
        <div className="mb-4">
          <label htmlFor="firstName" className="block mb-1">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={selectedFormData.firstName}
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
            value={selectedFormData.lastName}
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
            value={selectedFormData.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md">
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
            value={selectedFormData.email}
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
            value={selectedFormData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md">
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
        {selectedFormData.role === "guardian" && (
          <div className="mb-4">
            <label htmlFor="familyNumber" className="block mb-1">
              Family Number:
            </label>
            <input
              type="text"
              id="familyNumber"
              name="familyNumber"
              value={selectedFormData.familyNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        )}

        <button
          type="submit"
          className="col-span-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
