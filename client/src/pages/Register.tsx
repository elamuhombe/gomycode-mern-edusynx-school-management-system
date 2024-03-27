import React from 'react';
import { Footer, Header } from '../components';
import { TextField } from '@mui/material';
import CTAButton from '../components/Main/CTAButton';

const Register: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header />
      <div className='flex flex-col items-center w-full max-w-md px-4'>
        {/* Form to Register */}
        <form className='flex flex-col w-full gap-4'>
          <h3 className='text-xl font-600'>Register</h3>
          <p>Please fill out the registration form below.</p>
          <div className='flex flex-col w-full gap-4'>
            <div className="w-full">
              <TextField id="schoolName" label="School Name" variant="standard" />
            </div>
            <div className="w-full">
              <TextField id="phoneNumber" label="Phone Number" variant="standard" />
            </div>
            <div className="w-full">
              <TextField id="emailAddress" label="Email Address" variant="standard" />
            </div>
          </div>
          <div className='flex flex-col md:flex-row w-full gap-4'>
            <TextField id="postalAddress" label="Postal  Address" variant="standard" className='md:w-1/2' />
            <TextField id="postalCode" label="Postal Code" variant="standard" className='md:w-1/4' />
          </div>
          <div className='flex flex-col md:flex-row w-full gap-4'>
            <TextField id="city" label="City" variant="standard" className='md:w-1/2' />
            <TextField id="country" label="Country" variant="standard" className='md:w-1/2' />
          </div>
          {/* Text field for the message */}
          <div>
            <CTAButton text="Register" />
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
