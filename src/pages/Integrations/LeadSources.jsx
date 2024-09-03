import React, { useState } from 'react'
import { integrations } from '../../constants';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchInput = ({ searchTerm, setSearchTerm }) => (
  <div className="mb-6">
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