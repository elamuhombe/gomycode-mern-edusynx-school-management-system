import React from "react";
import { Footer, Header } from "../components";
import ContactForm from "../components/Contacts/ContactForm";
const ContactUs = () => {
  return (
    <div>
      <Header />
      <div className="flex justify-center">
   
        {/* Center horizontally */}
        <ContactForm/>
      </div>
      <Footer />
    </div>
  );
};
export default ContactUs;
