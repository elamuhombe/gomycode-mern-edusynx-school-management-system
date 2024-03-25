import React, { useState } from 'react';
import { TextField } from '@mui/material';

const Contacts: React.FC = () => {
  // State to store the message value
  const [message, setMessage] = useState('');

  // Function to handle changes in the message field
  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div className="flex">
      {/* Form to add new contact */}
      <form className='flex flex-col flex-1 gap-4'>
        <h4>Get In Touch</h4>
        <p>Please feel free to contact us if you have any questions, comments, or inquiries. We'd love to hear from you!</p>
        <div className='flex flex-1 flex-col w-80'>
          <TextField id="names" label="Names" variant="standard" />
          <TextField id="phoneNumber" label="Phone Number" variant="standard" />
          <TextField id="emailAddress" label="Email Address" variant="standard" />
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
          <button className="bg-red-400 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full mt-4" >
            Submit
          </button>
        </div>
      </form>
      <div className='flex flex-1'>
        <p>Google Maps</p>
      </div>
    </div>
  );
};

export default Contacts;
