
import React from "react"
import { Footer, Header } from "../components"
import Contacts from  "../components/Main/Contacts/Contacts";
const ContactUs = () =>{


return (
  <div>
    <Header />
    <div className="flex justify-center"> {/* Center horizontally */}
        <Contacts />
      </div>
    <Footer />
  </div>
);
};
export default ContactUs;
