import React from 'react';
import { FaTriangleExclamation } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="text-center p-8 bg-white shadow-xl rounded-lg max-w-md w-full">
        <div className="mb-6 flex justify-center">
          <FaTriangleExclamation  className='w-14 h-14 text-gray-600'/>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          404, Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Enter a valid URL, check the link and try again.
        </p>
        <NavLink to="/clients" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
          BACK TO HOME
        </NavLink>
      </div>
    </div>
  );
};

export default NotFoundPage;