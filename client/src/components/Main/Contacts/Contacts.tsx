import React, { useState } from 'react';
import { TextField } from '@mui/material';
import GoogleMap from './GoogleMap';
import SocialMediaIcons from './SocialMediaIcons';
import CTAButton from '../CTAButton';

const Contacts: React.FC = () => {
  // State to store the message value
  const [message, setMessage] = useState('');

  // Function to handle changes in the message field
  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  // Replace 'YOUR_API_KEY' with your actual Google Maps API key
  const apiKey = 'YOUR_API_KEY';

  return (
    <div className="flex mt-8">
      {/* Form to add new contact */}
      <form className='flex flex-col flex-1 gap-4'>
        <h3 className='text-xl font-600'>Get In Touch</h3>
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
          <CTAButton text="Submit" />
        </div>
      </form>
      <div className='flex flex-1'>
        <GoogleMap apiKey={apiKey} /> {/* Pass the API key to the GoogleMap component */}
      </div>
      <div className='flex flex-row mt-4'> {/* Add 'mt-4' class to create space */}
        <SocialMediaIcons />
      </div>
    </div>
  );
};

export default Contacts;
