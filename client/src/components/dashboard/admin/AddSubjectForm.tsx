import React, { useState } from 'react';

interface AddSubjectFormProps {
  onSubmit: (subjectData: any) => void;
  teachers: { _id: string; name: string }[]; // Array of teachers
  classes: { _id: string; name: string }[]; // Array of classes
  streams:{_id: string; name: string}[];
}

const AddSubjectForm: React.FC<AddSubjectFormProps> = ({ onSubmit, teachers, classes, streams }) => {
  const [subjectName, setSubjectName] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStream, setSelectedStream] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create subject data object
    const subjectData = {
      subject_name: subjectName,
      teacher: selectedTeacher,
      class: selectedClass,
      stream: selectedStream
    };
    // Call onSubmit function passed from parent component
    onSubmit(subjectData);
    // Reset form fields after submission
    setSubjectName('');
    setSelectedTeacher('');
    setSelectedClass('');
    setSelectedStream('');
  
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="subjectName" className="block font-medium text-gray-700">Subject Name:</label>
        <input
          type="text"
          id="subjectName"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="teacher" className="block font-medium text-gray-700">Select Teacher:</label>
        <select
          id="teacher"
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        >
          <option value="" disabled>Select a teacher</option>
          {teachers && teachers.map((teacher) => (
  <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
))}

        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="class" className="block font-medium text-gray-700">Select Class:</label>
        <select
          id="class"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        >
          <option value="" disabled>Select a class</option>
          {classes.map((classItem) => (
            <option key={classItem._id} value={classItem._id}>{classItem.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="stream" className="block font-medium text-gray-700">Select Stream:</label>
        <select
  id="stream"
  value={selectedStream}
  onChange={(e) => setSelectedStream(e.target.value)}
  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
  required
>
  <option value="" disabled>Select a Stream</option>
  {streams && streams.map((stream) => (
    <option key={stream._id} value={stream._id}>{stream.name}</option>
  ))}
</select>

      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Add Subject</button>
    </form>
  );
 
};

export default AddSubjectForm;
