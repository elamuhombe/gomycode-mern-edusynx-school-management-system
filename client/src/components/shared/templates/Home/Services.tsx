import React from 'react';

const Services: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {/* Custom Software Development */}
      <div className="bg-white shadow-md rounded-lg p-6 w-80">
        <h3 className="text-xl font-semibold mb-2">Custom Software Development</h3>
        <p className="text-gray-700">Designing and developing customized school management systems tailored to the specific needs and requirements of educational institutions.</p>
      </div>

      {/* System Integration */}
      <div className="bg-white shadow-md rounded-lg p-6 w-80">
        <h3 className="text-xl font-semibold mb-2">System Integration</h3>
        <p className="text-gray-700">Integrating various modules and functionalities within the school management system, such as student information management, attendance tracking, grade management, scheduling, and communication tools.</p>
      </div>

      {/* Mobile App Development */}
      <div className="bg-white shadow-md rounded-lg p-6 w-80">
        <h3 className="text-xl font-semibold mb-2">Mobile App Development</h3>
        <p className="text-gray-700">Creating mobile applications for iOS and Android platforms to enable access to school management system features on smartphones and tablets.</p>
      </div>

      {/* Add more service cards as needed */}
    </div>
  );
};

export default Services;