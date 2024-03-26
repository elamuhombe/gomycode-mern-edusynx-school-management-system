// LoginForm.tsx
import React, { useState } from 'react';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you can implement your login logic
    if (username === 'example' && password === 'password') {
      console.log('Login successful!');
      // Redirect or perform any other action upon successful login
    } else {
      setError('Invalid username or password');
    }
  };

  const usernameEntered = username.trim() !== '';
  const passwordEntered = password.trim() !== '';

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <label htmlFor="username" className="block mb-2">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          placeholder='username'
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full border border-gray-400 p-2 ${usernameEntered ? 'bg-blue-50' : ''}`}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full border border-gray-400 p-2 ${passwordEntered ? 'bg-blue-50' : ''}`}
          required
        />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button type="submit" className="mt-8 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
    </form>
  );
};

export default LoginForm;
