import React, { useState } from 'react';

interface Teacher {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  gender: Gender;
  isClassTeacher: boolean;
  teachingSubjects: string[];
}

enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
}

const AddTeacherForm: React.FC = () => {
  const [teacher, setTeacher] = useState<Teacher>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: Gender.Male,
    isClassTeacher: false,
    teachingSubjects: []
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTeacher(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: string[] = [];

    // Simple validation
    if (!teacher.firstName.trim()) {
      validationErrors.push('First name is required');
    }
    if (!teacher.lastName.trim()) {
      validationErrors.push('Last name is required');
    }
    if (!teacher.email.trim()) {
      validationErrors.push('Email is required');
    } else if (!isValidEmail(teacher.email)) {
      validationErrors.push('Invalid email format');
    }

    if (validationErrors.length === 0) {
      // Handle form submission
      console.log('Teacher:', teacher);
      // You can send the teacher data to your backend or perform other actions here
      // For now, we'll just reset the form
      setTeacher({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        gender: Gender.Male,
        isClassTeacher: false,
        teachingSubjects: []
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const isValidEmail = (email: string): boolean => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <h2>Add Teacher</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={teacher.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={teacher.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={teacher.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={teacher.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={teacher.gender}
            onChange={handleChange}
          >
            {Object.values(Gender).map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="isClassTeacher">Is Class Teacher:</label>
          <input
            type="checkbox"
            id="isClassTeacher"
            name="isClassTeacher"
            checked={teacher.isClassTeacher}
            onChange={() => setTeacher(prevState => ({ ...prevState, isClassTeacher: !prevState.isClassTeacher }))}
          />
        </div>
        <div>
          <label htmlFor="teachingSubjects">Teaching Subjects:</label>
          <input
            type="text"
            id="teachingSubjects"
            name="teachingSubjects"
            value={teacher.teachingSubjects.join(', ')}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Teacher</button>
      </form>
      {errors.length > 0 && (
        <div>
          <h3>Please fix the following errors:</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddTeacherForm;
