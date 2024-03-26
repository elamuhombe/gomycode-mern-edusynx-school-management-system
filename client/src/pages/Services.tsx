import React from 'react';
import { Footer, Header } from '../components';

const Services: React.FC = () => {
  return (
    <div>
      <Header />
    <h1 className='text-center text-4xl underline'>Services</h1>
    <div className="flex flex-wrap justify-center gap-6">
      {/* Web Development */}
     <div className="bg-white shadow-md rounded-lg p-6 w-80">
       <h3 className="text-xl font-semibold mb-2">Web Development</h3>
       <p className="text-gray-700">Building websites and web applications using various technologies such as HTML5, CSS3, JavaScript, React, Tailwind and backend frameworks like Nodejs, Express.js, MongoDB and Typescript.</p>
       </div>

       {/* Mobile App Development */}
     <div className="bg-white shadow-md rounded-lg p-6 w-80">
       <h3 className="text-xl font-semibold mb-2">Mobile App Development</h3>
       <p className="text-gray-700">Creating mobile applications for iOS and Android platforms to enable access to school management system features on smartphones and tablets.</p>
     </div>
     
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

     
{/* Maintenance And Support */}
<div className="bg-white shadow-md rounded-lg p-6 w-80">
       <h3 className="text-xl font-semibold mb-2">Maintenance And Support</h3>
       <p className="text-gray-700">
        We provide ongoing assistance, updates, and troubleshooting to ensure smooth operation and optimization of your school management software.
    </p>
     </div>

     

     {/* Cloud Computing Services */}
     <div className="bg-white shadow-md rounded-lg p-6 w-80">
       <h3 className="text-xl font-semibold mb-2">Cloud Computing Services</h3>
       <p className="text-gray-700">Leveraging cloud platforms such as AWS, Azure, or Google Cloud to build and deploy scalable and flexible software solutions.</p>
     </div>

     {/* Database Design And Development */}
     <div className="bg-white shadow-md rounded-lg p-6 w-80">
       <h3 className="text-xl font-semibold mb-2">Database Design And Development</h3>
       <p className="text-gray-700">Designing and managing databases to store and retrieve data efficiently. This includes database modeling, optimization, and administration</p>
     </div>
     {/* Software Testing And Quality Assurance */}
     <div className="bg-white shadow-md rounded-lg p-6 w-80">
       <h3 className="text-xl font-semibold mb-2">Software Testing And Quality Assurance</h3>
       <p className="text-gray-700">Ensuring the reliability, functionality, and performance of software through testing methodologies such as manual testing, automated testing, performance testing, etc.</p>
     </div>
   </div>
   <Footer />
      </div>
    
  );
};

export default Services;