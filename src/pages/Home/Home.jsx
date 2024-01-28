// Home.js

import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../../component/Navbar';
const Home = ({ token }) => {
  const [socketId, setSocketId] = useState('');
  const navigate = useNavigate();

  const handleNewWhiteboard = () => {
    const newSocketId = uuidv4();

    // Redirect to the Whiteboard page with the current socketId as a query parameter
    navigate(`/wb/${newSocketId}`);
  };

  const handleJoinWhiteboard = () => {
    // Redirect to the Whiteboard page with the socketId as a query parameter
    navigate(`/wb/${socketId}`);
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='w-screen mt-10 mx-auto ml-10'>
      

    
  <div className='flex flex-col gap-4 md:flex-row'>
    <div className='flex w-full md:w-3/6'>
      <label className='inline-block flex w-full'>
        Whiteboard ID:
        <input
          type="text"
          value={socketId}
          onChange={(e) => setSocketId(e.target.value)} 
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
        />
      </label>
    </div>

    <button
      onClick={handleJoinWhiteboard}
      className="flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-2/12 md:mr-4 max-w-max"
    >
      Join Whiteboard
    </button>

    <button
      onClick={handleNewWhiteboard}
      className="flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full md:w-2/12 md:mr-4 max-w-max"
    >
      New Whiteboard
    </button>
  </div>
</div>



  );
};

export default Home;
