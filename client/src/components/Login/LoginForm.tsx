import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate


interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

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

  const handleResetPassword = () => {
    navigate('/reset-password'); // Use navigate to redirect to the ResetPassword page
  };

  return (
    <div>
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
        
        <button type="submit" className="mt-8 w-full bg-red-400 text-white py-2 rounded hover:bg-blue-600">Login</button>
      </form>
      <p>
        <button onClick={handleResetPassword} className="text-blue-500 underline">Forgot your password?</button> {/* Use button to trigger navigate */}
      </p>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginForm;
