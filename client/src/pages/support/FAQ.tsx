import React from 'react';
import { Footer, Header } from '../../components';

const FAQ = () => {
  // FAQ data specific to a school management system
  const faqs = [
    { question: 'What is the School Management System?', answer: 'The School Management System is a software solution designed to streamline administrative tasks, manage student information, facilitate, communication between stakeholders, and improve decision-making processes within educational institutions.' },
    { question: 'Who can use the School Management System?', answer: 'The School Management System caters for various users including administrators, teachers, parents, enrollment officers and accountants, each with specific roles and permissions tailored to their responsibilities within the system.' },
    { question: 'How do I login to the system?', answer: 'To login to the system, visit the login page and enter your username/email address and password provided in your email.' },
    { question: 'I forgot my password, what should I do?', answer: 'You can usually reset it by clicking on the "Forgot Password" link. Follow the instructions and a new password shall be sent to your email' },
  
  ];

  return (
    <div>
      <Header />
      <div className="faq flex justify-center items-center h-full">
      <div className="max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">School Management System FAQs</h2>
        <ul>
          {faqs.map((faq, index) => (
            <li key={index} className="mb-4">
              <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <Footer />
    </div>
    
  );
};

export default FAQ;
