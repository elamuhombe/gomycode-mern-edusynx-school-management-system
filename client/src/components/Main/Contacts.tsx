import React from 'react';
import { TextField, Button } from '@mui/material';


const Contacts: React.FC = () => {
  

  return (
    <div className="flex">
      {/* Form to add new contact */}
      <form className='flex flex-col flex-1 gap-4'>
        <h4>Get In Touch</h4>
        <p>Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.</p>
      <div>
      <div className='flex flex-1 flex-col w-80'>
      <TextField id="standard-basic" label="Names" variant="standard" />
      <TextField id="standard-basic" label="Phone Number" variant="standard" />
      <TextField id="standard-basic" label="Email Address" variant="standard" />
    </div>
    <div>
      <Button variant="contained" color="primary">
        Submit
      </Button>
    </div>
    
        </div>
      
      </form>
      <div className='flex flex-1'>
    <p>Google Maps</p>
    </div>
    </div>
  );
};

export default Contacts;
