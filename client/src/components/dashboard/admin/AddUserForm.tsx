import React, { useEffect, useState } from "react";
import { IUser, IClass, ISubject } from "../../../types";
import { useGlobalState } from "../../../hooks/useGlobalContext";
import { useSubmitForm } from "../../../hooks/hooks";

type FormData = IUser & IClass;

const AddUserForm: React.FC = () => {
  const { submitForm } = useSubmitForm();
  const [isChecked, setIsChecked] = useState(false);

  const [classes, setClasses] = useState<IClass[]>([]);
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  useEffect(() => {
    fetchData(); // Fetch classes when component mounts
  }, []);

  // const {
  //   state: { loggedInUser },
  // } = useGlobalState();
  //const state = useGlobalState()
  const { state } = useGlobalState(); // Destructure state directly
  const loggedInUser = state.loggedInUser; // Extract loggedInUser

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    role: "",
    familyNumber: null,
    isClassTeacher: false,
    className: "",
    subject_name: "",
    school: loggedInUser?._id || "",
    teachingSubjects: [],
  });

  // Select only the properties you need
  const selectedFormData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    gender: formData.gender,
    email: formData.email,
    role: formData.role,
    familyNumber: formData.familyNumber,
    isClassTeacher: formData.isClassTeacher,
    className: formData.className,
    //schoolClass: formData.schoolClass,
    school: loggedInUser?._id,
    subject_name: formData.subject_name,
    teachingSubjects: formData.teachingSubjects,
  };
  useEffect(() => {
    fetchData();
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      // fetch subject from backend
      const subjectsResponse = await fetch("http://localhost:5100/subject");

      if (!subjectsResponse.ok) {
        throw new Error("Failed to fetch subjects");
      }

      const subjectsData = await subjectsResponse.json();
      console.log("Fetched subjects:", subjectsData); // Log fetched subjects data

      setSubjects(subjectsData);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

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

  const handleSubjectsSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedSubjectName = e.target.value;
    setSelectedSubject(selectedSubjectName);
  };

  const addSubject = () => {
    if (selectedSubject && !selectedSubjects.includes(selectedSubject)) {
      setSelectedSubjects([...selectedSubjects, selectedSubject]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        teachingSubjects: [...prevFormData.teachingSubjects, selectedSubject],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    try {
      // Include selected subjects in teachingSubjects array
      const updatedFormData = {
        ...formData,
        teachingSubjects: selectedSubjects,
      };

      const result = await submitForm("http://localhost:5100/user", "POST", {
        ...updatedFormData,
        school: state?.loggedInUser?._id || "",
      });
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
          familyNumber: null,
          className: "",
          isClassTeacher: false,
        });
        setSelectedSubjects([]); // Reset selected subjects
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setFormData((prevState) => ({
      ...prevState,
      isClassTeacher: !isChecked,
    }));
  };

  // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleClassSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClassName = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      className: selectedClassName,
    }));
    setSelectedClass(selectedClassName);
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

        {/* Conditionally render isClassTeacher checkbox if role is "Teacher" */}
        {selectedFormData.role === "teacher" && (
          <div className="mb-16">
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

            {/* Render drop-down menu when checkbox is checked */}
            {isChecked && (
              <div className="mb-4 flex-end">
                <label
                  htmlFor="schoolClass"
                  className="block text-gray-700 text-sm font-bold mb-2">
                  School Class:
                </label>
                <select
                  value={selectedClass}
                  onChange={handleClassSelectChange}
                  className="w-full px-4 py-2 border rounded-md">
                  <option value="">Select a Class</option>
                  {classes.map((classItem) => (
                    <option
                      key={classItem.className}
                      value={classItem.className}>
                      {classItem.className}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="mb-4">
              {/* Render dropdown for subjects */}
              <label htmlFor="teachingSubjects" className="block mb-1">
                Teaching Subjects:
              </label>
              <div>
                <select
                  value={selectedSubject}
                  onChange={handleSubjectsSelectChange}
                  className="w-full px-4 py-2 border rounded-md">
                  <option value="">Select a Subject</option>
                  {subjects.map((subjectItem) => (
                    <option
                      key={subjectItem.subject_name}
                      value={subjectItem.subject_name}>
                      {subjectItem.subject_name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={addSubject}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Add Subject
                </button>
              </div>
              <div>
                {selectedSubjects.map((subject, index) => (
                  <input
                    key={index}
                    type="text"
                    value={subject}
                    readOnly={true}
                    className="w-full px-4 py-2 border rounded-md mb-2"
                  />
                ))}
              </div>
            </div>
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
