import React, { useState } from 'react';

const InviteTeamMembersModal = ({ isOpen, onClose, onInvitationSent }) => {
  const [email, setEmail] = useState('');
  const [permissions, setPermissions] = useState({
    self: true,
    others: false,
    unassigned: false
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  if (!isOpen) return null;

  const handleSendInvite = () => {
    //send invite logic

    onInvitationSent();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Invite Team Members</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">EMAIL ADDRESSES</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="onealias01@gmail.com"
          />
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2">BASIC PERMISSIONS</h3>
          <p className="text-sm text-gray-600 mb-2">View Clients</p>
          <p className="text-sm text-gray-600 mb-2">Select the types of clients this user can view:</p>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={permissions.self}
                onChange={() => setPermissions({...permissions, self: !permissions.self})}
                className="mr-2"
              />
              <span>Clients assigned to themselves</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={permissions.others}
                onChange={() => setPermissions({...permissions, others: !permissions.others})}
                className="mr-2"
              />
              <span>Clients assigned to others</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={permissions.unassigned}
                onChange={() => setPermissions({...permissions, unassigned: !permissions.unassigned})}
                className="mr-2"
              />
              <span>Unassigned clients</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            ADVANCED PERMISSIONS
            <svg className={`w-4 h-4 ml-1 transform ${showAdvanced ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {showAdvanced && (
            <div className="mt-2">
              {/* Add advanced permissions options here */}
            </div>
          )}
        </div>

        <button
          onClick={handleSendInvite}
          className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition duration-300"
        >
          SEND INVITE
        </button>
      </div>
    </div>
  );
};

export default InviteTeamMembersModal;