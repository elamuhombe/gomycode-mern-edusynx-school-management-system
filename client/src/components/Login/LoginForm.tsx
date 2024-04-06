import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 
  const navigate = useNavigate();


  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log({username, password})
  fetch('http://localhost:5100/login', {
    method: 'POST',
    body: JSON.stringify({username, password})
  }).then(res =>res.json())
    .then(data =>{
      console.log(data)
    }).catch(error =>console.log(error.message))
    return;
  
   /*
    try {
      // Loop through users array to find matching username and password
      const matchedUser = state.users.find(
        user => user.email === username && user.password === password
      );
  
      if (matchedUser) {
        switch (matchedUser.role) {
          case Role.Admin:
            navigate('/dashboard/admin');
            break;
          case Role.HeadTeacher:
            navigate('/dashboard/headteacher');
            break;
          case Role.Teacher:
            navigate('/dashboard/teacher');
            break;
          case Role.Accountant:
            navigate('/dashboard/accountant');
            break;
          case Role.EnrollmentOfficer:
            navigate('/dashboard/enrollment-officer');
            break;
          default:
            setError('Invalid user role');
        }
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
    }
    */
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
