
import React, { useState } from 'react';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <header>
       <h2 className='mt-8'>edusynx school management system</h2>
      </header>
      
    </div>
  );
};

export default Login;
