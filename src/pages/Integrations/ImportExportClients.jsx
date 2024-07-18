import React from 'react';

const ActionCard = ({ icon, title, description, action }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
    <div className="flex items-center mb-4">
      <img src={icon} alt={title} className="w-10 h-10 mr-4" />
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="flex justify-end">
      <button className="text-blue-600 font-semibold hover:underline">
        {action}
      </button>
    </div>
  </div>
);

const ImportExportClients = () => {
  const actions = [
    {
      icon: 'https://example.com/import-icon.png',
      title: 'Import Clients from CSV',
      description: 'Bulk import contacts from a CSV file into your Privyr account',
      action: 'Configure',
    },
    {
      icon: 'https://example.com/export-icon.png',
      title: 'Export Client List',
      description: 'Receive a download of your client list in CSV format',
      action: 'Configure',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <ActionCard key={index} {...action} />
        ))}
      </div>
    </div>
  );
};

export default ImportExportClients;