import React from 'react';
import { Footer, Header } from '../../components';

const Documentation: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="ml-4">
      <h1 className='text-center'>School Management System - Documentation</h1>

      <h2>1. Introduction</h2>
      <p>
        The School Management System is a comprehensive software solution
        designed to streamline administrative tasks, manage student
        information, facilitate communication between stakeholders, and improve
        decision-making processes within educational institutions.
      </p>

      <h2>2. Features</h2>
      <p>
        The system offers the following key features:
        <ul>
          <li>Student Management</li>
          <li>Teacher Management</li>
          <li>Attendance Tracking</li>
          <li>Fee Management</li>
          <li>Parent Portal</li>
          <li>Dashboards and Analytics</li>
          <li>Administrative Tools</li>
        </ul>
      </p>

      <h2>3. User Roles</h2>
      <p>
        The School Management System supports multiple user roles with specific
        permissions tailored to their responsibilities within the system:
        <ul>
          <li>Administrator</li>
          <li>Head Teacher</li>
          <li>Teacher</li>
          <li>Enrollment Officer</li>
          <li>Parent</li>
        </ul>
      </p>

      <h2>4. Technology Stack</h2>
      <p>
        The system is built using modern web technologies:
        <ul>
          <li>Front-end: React.js, CSS</li>
          <li>Back-end/API: Node.js, Express.js</li>
          <li>Database: MongoDB</li>
        </ul>
      </p>

      <h2>5. Installation</h2>
      <p>
        To install the School Management System, follow these steps:
        <ol>
          <li>Clone the repository from GitHub.</li>
          <li>Install Node.js and MongoDB on your system.</li>
          <li>Run 'npm install' to install dependencies.</li>
          <li>Configure environment variables.</li>
          <li>Run 'npm start' to start the application.</li>
        </ol>
      </p>

      <h2>6. Usage</h2>
      <p>
        Once the application is running, users can access the system using
        their credentials. The dashboard provides access to various modules and
        functionalities based on the user's role and permissions.
      </p>

      <h2>7. Support</h2>
      <p>
        For any questions, issues, or assistance, please contact our support
        team at emuhombe@gmail.com.
      </p>

      <h2>8. License</h2>
      <p>
        This project is licensed under the Edusynx License - see the LICENSE file
        for details.
      </p>

      </div>
      
      <Footer />
    </div>
  );
};

export default Documentation;
