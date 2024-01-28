import React from 'react';
import {  useNavigate } from "react-router-dom";

const Navbar = ({isAuthenticated ,setIsAuthenticated} ) => {
    const navigate = useNavigate();
    const logout=()=>{
        setIsAuthenticated(false)
        navigate("/login");
    }
  return (
    <nav className="bg-indigo-600">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex text-3xl font-bold text-white  flex-shrink-0 items-center">
              ShareBoard
            </div>
          </div>
          {isAuthenticated && 
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button type="button" className="relative rounded-md font-semibold bg-indigo-800  text-white hover:bg-indigo-700 p-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span onClick={logout}>Logout</span>
          </button>
        </div> }
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;