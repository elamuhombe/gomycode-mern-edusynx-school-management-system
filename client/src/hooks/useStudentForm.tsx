import { useState } from 'react';

interface studentFormData {
  firstName: string;
  lastName: string;
  gender: string;
  studentClass: string;
  previousSchool: string;
  registrationDate: Date;
  // dateOfBirth: Date;
}

const useStudentForm = (initialState: studentFormData) => {
  const [studentFormData, setStudentFormData] = useState<studentFormData>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setStudentFormData({ ...studentFormData, [e.target.name]: e.target.value });
  };

  return {
    studentFormData,
    handleChange,
  };
};

export default useStudentForm;
