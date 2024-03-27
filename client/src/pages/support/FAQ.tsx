import React from 'react';

const FAQ = () => {
  // FAQ data specific to a school management system
  const faqs = [
    { question: 'How do I enroll my child in classes?', answer: 'You can enroll your child by visiting the school office.' },
    { question: 'What are the school hours?', answer: 'The school hours are from 8:00 AM to 3:00 PM, Monday to Friday.' },
    { question: 'How can I pay school fees online?', answer: 'You can pay school fees online through the schools website or portal.' },
    { question: 'Who can I contact for technical support with the school portal?', answer: 'You can contact the IT department at it@schoolname.com.' },
    // Add more FAQ items as needed
  ];

  return (
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
  );
};

export default FAQ;
