import React from 'react';
import { Footer, Header } from '../../components';

const FAQ = () => {
  // FAQ data specific to a school management system
  const faqs = [
    { question: 'How do I register my school?', answer: 'Click on Register Link and fill out the form, then submit by clicking the submit button.' },
    { question: 'What are the school hours?', answer: 'The school hours are from 8:00 AM to 3:00 PM, Monday to Friday.' },
    { question: 'How can I pay school fees online?', answer: 'You can pay school fees online through the school' },
    { question: 'Who can I contact for technical support with the school portal?', answer: 'You can contact the IT department at it@schoolname.com.' },
    // Add more FAQ items as needed
  ];

  return (
    <div>
      <Header />
      <div className="faq">
      <h2>School Management System FAQs</h2>
      <ul>
        {faqs.map((faq, index) => (
          <li key={index}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
          <Footer />
    </div>
    
  );
};

export default FAQ;
