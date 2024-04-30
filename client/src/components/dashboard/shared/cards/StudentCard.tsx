import React from 'react';

type StudentCardProps = {data:number}

const StudentCards: React.FC <StudentCardProps>= ({data}) => {

  // Count the number of students
  const numberOfStudents = data || 0
  
  // Convert the student count to a string
  const description = `${numberOfStudents}`;
  
  return (
    <div>
      {/* Render the student count */}
      <p>{description}</p>
    </div>
  );
};

export default StudentCards;