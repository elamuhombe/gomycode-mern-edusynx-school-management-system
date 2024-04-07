import React from 'react';

import AddTeacherForm from '../../components/dashboard/admin/charts/AddTeacherForm';

const AddTeacher: React.FC = () => {
  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-5">Add Teacher</h1>
      <AddTeacherForm /> {/* Render the AddTeacherForm component */}
    </div>
  );
};

export default AddTeacher;
