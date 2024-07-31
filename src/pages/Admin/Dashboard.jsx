import React from "react";
import { navItems } from "../../constants";
import { FaPlus } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8 mb-4">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>

        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold tracking-tight text-gray-700 my-4">
              Manage Tabs
            </h1>
            <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center gap-1"
        >
          <FaPlus /> ADD TAB
        </button>
          </div>
          <div className="flex items-center gap-3">
            {navItems.map((tab) => (
              <div className="px-4 py-2 bg-gray-100 rounded-md">{tab.name}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
