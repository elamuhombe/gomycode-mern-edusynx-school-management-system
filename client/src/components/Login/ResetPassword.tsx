import React, { useState } from 'react';
import { Footer, Header } from '..';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('An email with instructions to reset your password has been sent.');
      } else {
        throw new Error('Failed to reset password. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while resetting your password. Please try again later.');
    }
  };

  return (
    <div>
       <Header />
       <div className="flex flex-col items-center justify-center h-screen">
  <h2 className="mb-4">Reset Password</h2>
  <form onSubmit={handleSubmit} className="w-full max-w-sm mb-48">
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700">Email Address:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
        required
        className="w-full px-4 py-2 border rounded-md text-gray-700 bg-white focus:outline-none focus:border-blue-500"
      />
    </div>
    <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Reset Password</button>
  </form>
</div>

    <Footer />
      </div>
    
  );
};

export default ResetPassword;
