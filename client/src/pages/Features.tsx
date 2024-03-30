// Import necessary dependencies
import React from 'react';
import { Footer, Header } from '../components';
import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { MdAdminPanelSettings } from "react-icons/md";
import { HiDocumentReport } from "react-icons/hi";
import { RiParentFill } from "react-icons/ri";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { IoMdPersonAdd } from "react-icons/io";

const Services: React.FC = () => {
  return (
    <div>
      <Header />
      <h1 className='text-center text-4xl underline'>Features</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {/* Student Feature */}
        <div className="card bg-white shadow-md rounded-lg p-6 w-80 hover:bg-gray-100 transition duration-300">
          <PiStudentFill className='mx-auto' />
          <h3 className="text-xl text-center font-semibold mb-2">Student</h3>
          <p className="text-gray-700">This module will contain student details
            such as bio data, contact information, and enrollment details.</p>
        </div>

        {/* Teacher Feature */}
        <div className="card bg-white shadow-md rounded-lg p-6 w-80 hover:bg-gray-100 transition duration-300">
          <GiTeacher className='mx-auto' />
          <h3 className="text-xl text-center  font-semibold mb-2">Teacher</h3>
          <p className="text-gray-700">The teacher module will manage teacher
            information including personal details, qualifications, and performance.
            Teachers will use the system to mark attendance, enter grades, and
            communicate with parents.</p>
        </div>

        {/* Attendance Feature */}
        <div className="card bg-white shadow-md rounded-lg p-6 w-80 hover:bg-gray-100 transition duration-300">
          <GiTeacher className='mx-auto' />
          <h3 className="text-xl text-center  font-semibold mb-2">Attendance</h3>
          <p className="text-gray-700">Captures student attendance and provides
            reports to teachers, administrators, and parents. It ensures accurate
            attendance tracking and helps identify attendance patterns and trends.</p>
        </div>

        {/* Admins Feature */}
        <div className="card bg-white shadow-md rounded-lg p-6 w-80 hover:bg-gray-100 transition duration-300">
          <MdAdminPanelSettings className='mx-auto' />
          <h3 className="text-xl text-center font-semibold mb-2">Admin</h3>
          <p className="text-gray-700">The admin module will handle administrative
            tasks such as user account management, role assignments, and system
            configuration. Admins will have full access to all system functionalities
            and data.</p>
        </div>

        {/* Enrollment Officers Feature */}
        <div className="card bg-white shadow-md rounded-lg p-6 w-80 hover:bg-gray-100 transition duration-300">
          <IoMdPersonAdd className='mx-auto' />
          <h3 className="text-xl text-center font-semibold mb-2">Enrollment Officer</h3>
          <p className="text-gray-700">This module will manage the enrollment
            process, including student admissions, registration, and enrollment status
            updates. Enrollment officers will ensure accurate and up-to-date enrollment
            records in the system.</p>
        </div>

        {/* Enrollment Officers Feature */}
        <div className="card bg-white shadow-md rounded-lg p-6 w-80 hover:bg-gray-100 transition duration-300">
          <LiaMoneyCheckAltSolid className='mx-auto' />
          <h3 className="text-xl text-center font-semibold mb-2">Accounts</h3>
          <p className="text-gray-700">Manages fee collection, tracks payment
            history, and generates invoices and receipts. It ensures timely fee
            payments and provides financial reports to administrators and parents.</p>
        </div>

        {/* Parents Features */}
        <div className="card bg-white shadow-md rounded-lg p-6 w-80 hover:bg-gray-100 transition duration-300">
          <RiParentFill className='mx-auto' />
          <h3 className="text-xl text-center font-semibold text-center mb-2">Parents</h3>
          <p className="text-gray-700">
            Parents will have access to their child's academic
            records, attendance, fee payments, and communication with teachers and
            administrators. They can track their child's progress and communicate
            effectively with the school through the system.
          </p>
        </div>

        {/* Dasboard And Reports Features */}
        <div className="card bg-white shadow-md rounded-lg p-6 w-80 hover:bg-gray-100 transition duration-300">
          <HiDocumentReport className='mx-auto' />
          <h3 className="text-xl text-center font-semibold mb-2">Dasboard and Reports</h3>
          <p className="text-gray-700">Provides dashboards and reports
            for administrators, teachers, and parents to analyze data collected from
            various modules. It helps identify trends, patterns, and areas of improvement
            in student performance, attendance, and financial management.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
