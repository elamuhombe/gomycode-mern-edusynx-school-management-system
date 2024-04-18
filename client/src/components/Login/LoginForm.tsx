import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../hooks/useGlobalContext';





const LoginForm: React.FC = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 const {state, dispatch} = useGlobalState();
  const navigate = useNavigate();


  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
  
    console.log({ username, password });
  
    try {
      const response = await fetch('http://localhost:5100/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to log in');
      }
  
      const data = await response.json();
  
      dispatch({
        type: 'UPDATE_USER',
        payload: {
          ...state.loggedInUser,
          ...data.accountDetails
        }
      });
    
  
      // Navigation based on user's role
      const matchedUser = data.matchedUser;
      if (matchedUser) {
        switch (matchedUser.role) {
          case 'admin':
            navigate('/dashboard/admin');
            break;
          case 'headteacher':
            navigate('/dashboard/headteacher');
            break;
          case 'teacher':
            navigate('/dashboard/teacher');
            break;
          case 'accountant':
            navigate('/dashboard/accountant');
            break;
          case 'enrollment-officer':
            navigate('/dashboard/enrollment-officer');
            break;
          default:
            console.error('Invalid user role');
        }
      } else {
        console.error('Invalid username or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error, display message to user, etc.
    }
  };
  

  const usernameEntered = username.trim() !== '';
  const passwordEntered = password.trim() !== '';

  const handleResetPassword = () => {
    navigate('/reset-password');
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
            autoComplete='username'
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full border border-gray-400 p-2 ${passwordEntered ? 'bg-blue-50' : ''}`}
            autoComplete="current-password" // Add autocomplete attribute
            required
          />
        </div>
       
        
        <button type="submit" className="mt-8 w-full bg-red-400 text-white py-2 rounded hover:bg-blue-600">Login</button>
      </form>
      <p>
        <button onClick={handleResetPassword} className="text-blue-500 underline">Forgot your password?</button>
      </p>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginForm;
