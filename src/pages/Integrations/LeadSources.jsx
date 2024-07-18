import React, { useState } from 'react'
import { integrations } from '../../constants';

const SearchInput = ({ searchTerm, setSearchTerm }) => (
  <div className="mb-6">
    <div className="relative">
      <input
        type="text"
        placeholder="Search integrations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <svg
        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </div>
  </div>
);

const IntegrationCard = ({ icon, name, description, status, action }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
    <div className="flex items-center mb-4">
      <img src={icon} alt={name} className="w-10 h-10 mr-4" />
      <h3 className="text-xl font-semibold">{name}</h3>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="flex justify-between items-center">
      <span className="text-gray-500">{status}</span>
      <button className="text-blue-600 font-semibold hover:underline">
        {action}
      </button>
    </div>
  </div>
);

const LeadSources = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIntegrations = integrations.filter((integration) =>
    integration.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIntegrations.map((integration, index) => (
          <IntegrationCard key={index} {...integration} />
        ))}
      </div>
    </div>
  );
};

export default LeadSources;