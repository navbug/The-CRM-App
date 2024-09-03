import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const InviteTeamMembersModal = ({ isOpen, onClose, onInvitationSent }) => {
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSendInvite = () => {
    //send invite logic

    onInvitationSent();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <form onSubmit={handleSendInvite} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Invite Team Members</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoClose  className='w-7 h-7'/>
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">EMAIL ADDRESS</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="example@gmail.com"
          />
        </div>

        <button type='submit' 
          className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition duration-300"
        >
          SEND INVITE
        </button>
      </form>
    </div>
  );
};

export default InviteTeamMembersModal;