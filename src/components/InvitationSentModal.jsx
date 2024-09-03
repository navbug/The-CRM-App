import React from 'react';
import { FaThumbsUp } from 'react-icons/fa';

const InvitationSentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className='flex justify-center mb-6'>
          <FaThumbsUp className='text-teal-500 w-14 h-14'/>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">INVITATION SENT!</h2>
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