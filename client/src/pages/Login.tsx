// Login.tsx
import React from 'react';
import { Footer, Header } from '../components'; // Assuming you have Header and Footer components
import LoginForm from '../components/Login/LoginForm';

const Login: React.FC = () => {
  const handleLoginFormSubmit = (username: string, password: string) => {
    // Handle form submission here, e.g., call API, perform authentication, etc.
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />
      <div className="flex justify-center items-center mt-16">
        <div className="w-full max-w-xs">
          <h2 className="text-center text-2xl mb-4">Login</h2>
          <LoginForm onSubmit={handleLoginFormSubmit} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
