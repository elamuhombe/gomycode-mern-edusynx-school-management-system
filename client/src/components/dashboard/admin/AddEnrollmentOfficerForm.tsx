import React, { useState } from 'react';

interface EnrollmentOfficer {
  firstName: string;
  lastName: string;
  email: string;
  date: string;
  active: boolean;
}

const AddEnrollmentOfficerForm: React.FC = () => {
  const [officer, setOfficer] = useState<EnrollmentOfficer>({
    firstName: '',
    lastName: '',
    email: '',
    date: '',
    active: false
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setOfficer(prevState => ({
      ...prevState,
      [name]: inputValue
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: string[] = [];

    if (!officer.firstName.trim()) {
      validationErrors.push('First name is required');
    }
    if (!officer.lastName.trim()) {
      validationErrors.push('Last name is required');
    }
    if (!officer.email.trim()) {
      validationErrors.push('Email is required');
    } else if (!isValidEmail(officer.email)) {
      validationErrors.push('Invalid email format');
    }
    if (!officer.date.trim()) {
      validationErrors.push('Date is required');
    }

    if (validationErrors.length === 0) {
      // Handle form submission
      console.log('Enrollment Officer:', officer);
      // You can send the enrollment officer data to your backend or perform other actions here
      // For now, we'll just reset the form
      setOfficer({
        firstName: '',
        lastName: '',
        email: '',
        date: '',
        active: false
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <h2>Add Enrollment Officer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={officer.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={officer.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={officer.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={officer.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="active"
              checked={officer.active}
              onChange={handleChange}
            />
            Active
          </label>
        </div>
        <button type="submit">Add Enrollment Officer</button>
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

export default AddEnrollmentOfficerForm;
