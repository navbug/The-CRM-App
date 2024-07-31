import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { clientTabs } from '../../constants';
import AddClientModal from '../../components/AddClientModel';
import { FaPlus } from 'react-icons/fa';

const Clients = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Clients</h1>
        <button onClick={openModal} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center gap-1"
        >
          <FaPlus /> ADD NEW CLIENT
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex border-b">
          {clientTabs.map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.path}
              end={tab.path === '/clients'}
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

      <AddClientModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Clients;