import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/shared/Header/Header';
import { useFetch } from '../hooks/useFetch'
import { useGlobalState } from '../hooks/useGlobalContext'

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {handleLogin: handLogin} = useFetch('http://localhost:5100/schools');
  const {state, dispatch} = useGlobalState()
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      // Fetch data using useFetch hook
      const data = await handLogin('http://localhost:5100/login', {username, password});
      
      // Handle response data
      // console.log({ useFetchData: data });
      if(data.accountDetails){
        dispatch({type:"UPDATE_USER",payload:{
          ...state.loggedInUser, ...data.accountDetails
        }})
     return navigate('/dashboard/admin')
      }


     
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const usernameEntered = username.trim() !== '';
  const passwordEntered = password.trim() !== '';

  const handleResetPassword = () => {
    navigate('/reset-password');
  };

  return (
    <div>
      <Header />
      <div className='flex flex-col my-auto'>
        <form onSubmit={(e) => handleLogin(e)}>
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
    </div>
  );
};

export default Login;
