import React, { useState } from "react";
import { TextField } from "@mui/material";
import SocialMediaIcons from "./SocialMediaIcons";
import { IoMdMail} from "react-icons/io";
import { BsTelephoneFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import CTAButton from "../../shared/CTAButton";

const Contacts: React.FC = () => {
  // State to store the message value
  const [message, setMessage] = useState("");

  // Function to handle changes in the message field
  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };



  return (
    <div className="flex mt-8">
      {/* Form to add new contact */}
      <form className="flex flex-col flex-1 gap-4">
        <h3 className="text-xl font-600">Get In Touch</h3>
        <p>
          Please feel free to contact us if you have any questions, comments, or
          inquiries. We'd love to hear from you!
        </p>
        <div className="flex flex-1 flex-col w-80">
          <TextField id="names" label="Names" variant="standard" />
          <TextField id="phoneNumber" label="Phone Number" variant="standard" />
          <TextField
            id="emailAddress"
            label="Email Address"
            variant="standard"
          />
          {/* Text field for the message */}
          <TextField
            id="message"
            label="Message"
            variant="standard"
            value={message}
            onChange={handleMessageChange}
            multiline
            rows={4}
          />
        </div>
        <div>
          <CTAButton text="Submit" />
        </div>
      </form>
      
      <div className="flex flex-col flex-1 gap-4 mt-36">
      <div>
      <div className="mt-4" style={{ display: 'flex', alignItems: 'center' }}>
      <IoMdMail style={{ marginRight: '5px' }} />
      <span>emuhombe@gmail.com</span>
    </div>
    <div className="mt-4" style={{ display: 'flex', alignItems: 'center' }}>
      <BsTelephoneFill style={{ marginRight: '5px' }} />
      <span>+254 7012 17 788</span>
    </div>
        <div className="mt-4" style={{ display: 'flex', alignItems: 'center' }}>
      <MdLocationPin style={{ marginRight: '5px' }} />
      <span>Kisumu, Kenya</span>
    </div>
        
      </div>
      <div className="mt-16">
          {/* Add 'mt-4' class to create space */}
          <SocialMediaIcons />

      </div>
      
      </div>
    </div>
  );
};

export default Contacts;
