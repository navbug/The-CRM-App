import React from 'react';

const InvitationSentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <button onClick={onClose} className="float-right text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <svg className="w-16 h-16 text-teal-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        <h2 className="text-2xl font-bold mb-4">INVITATIONS SENT!</h2>
        <p className="mb-6">
          You've successfully invited 1 people to join your team on Privyr. Please have them check their email and accept the invite.
        </p>
        <p className="mb-6">
          You can manage your team members, their permissions, and other settings under your Team tab.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition duration-300"
        >
          DONE
        </button>
      </div>
    </div>
  );
};

export default InvitationSentModal;