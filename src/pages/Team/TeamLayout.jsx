import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { teamTabs } from '../../constants';

const TeamLayout = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-start items-center mb-6">
        <h1 className="text-4xl font-bold">Team</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex border-b">
          {teamTabs.map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.path}
              end={tab.path === '/team/dashboard'}
              className={({ isActive }) =>
                `py-4 px-6 font-medium ${isActive
                  ? 'border-b-2 border-teal-500 text-teal-500'
                  : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default TeamLayout;