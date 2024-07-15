import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="text-center p-8 bg-white shadow-xl rounded-lg max-w-md w-full">
        <div className="mb-6">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          404, Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Enter a valid URL, check the link and try again.
        </p>
        <NavLink to="/" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
          BACK TO HOME
        </NavLink>
      </div>
    </div>
  );
};

export default NotFoundPage;