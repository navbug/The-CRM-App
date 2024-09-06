import React from 'react';
import { FaWifi } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const NoInternetPage = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="text-center p-8 bg-white shadow-xl rounded-lg max-w-md w-full">
        <div className="mb-6 flex justify-center">
          <FaWifi className='w-14 h-14 text-gray-600'/>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          No Internet Connection
        </h1>
        <p className="text-gray-600 mb-8">
          Please check your network connection and try again.
        </p>
        <div className="space-x-4">
          <button
            onClick={handleRefresh}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            REFRESH
          </button>
          <NavLink to="/clients" className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 inline-block">
            BACK TO HOME
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NoInternetPage;