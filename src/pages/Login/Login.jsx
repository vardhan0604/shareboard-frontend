// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Navigate,useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated,setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false); // New state variable
  const navigate = useNavigate();

  const redirectRegister = () => {
    navigate('/register');
  };

  const handleLogin = async () => {
   
    try {
      const response = await axios.post('https://shareboard-backend.onrender.com/auth/login', { email, password });
      // Assuming your backend sends a token upon successful login
      const token = response.data.token;
      // Store the token or set it in your global state
      // Example: localStorage.setItem('token', token);
      console.log(token)
      setToken(token)
      setIsAuthenticated(true);
      setShouldRedirect(true); // Set the redirect flag when registration is successful
      
    } catch (error) {
      console.error('Login error:', error);
    }

   
  };

  if (shouldRedirect) {
    console.log("in")
    return <Navigate to="/" />; // Redirect when the flag is set
  }

  return (
    <div className=' '>
      {/* <h2 className='text-3xl font-bold underline'>Login</h2>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button> */}

<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password"  className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleLogin}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
               Login
              </button>
            </div>
            <div className='text-xs text-center text-indigo-600 cursor-pointer	 hover:text-indigo-500' onClick={redirectRegister}>New User? Register Now</div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
