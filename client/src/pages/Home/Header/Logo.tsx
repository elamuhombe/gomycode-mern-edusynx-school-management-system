
import React from 'react';

// Define a functional component named Logo
const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <img src="/images/logo.png" alt="Logo" className="w-8" />
      <h1 className="text-xl font-bold">Edusynx</h1>
      {/* You can add any other JSX elements for your logo */}
    </div>
  );
};

export default Logo; // Export the Logo component
