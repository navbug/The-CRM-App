import React from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';

const SendingModal = ({ onBack, onClose, resetModal, selectedOption, message }) => {
  const isWhatsApp = selectedOption === 'WhatsApp';

  return (
    <div className="flex flex-col h-full bg-white p-6 rounded-lg shadow-lg">
      <button 
        onClick={onBack}
        className="text-teal-500 hover:text-teal-600 flex items-center gap-1 text-sm font-medium mb-6"
      >
        <IoIosArrowBack className="text-lg" /> BACK
      </button>

      <div className="flex-grow flex flex-col items-center justify-center gap-4 text-center">
        <div className="text-teal-500 mb-4">
          {isWhatsApp ? (
            <FaWhatsapp className='w-16 h-16'/>
          ) : (
            <MdEmail className='w-16 h-16'/>
          )}
        </div>
        <h2 className="text-3xl font-bold text-teal-500 mb-4">
          Sending Message via {isWhatsApp ? 'WhatsApp' : 'Email'}...
        </h2>
        {/* <p className="text-xl font-semibold mb-2">{message.title}</p>
        <p className="text-gray-600 mb-4">
          To {recipient.name} ({isWhatsApp ? recipient.phone : recipient.email})
        </p>
        <p className="text-sm text-gray-500">
          {isWhatsApp
            ? "You'll be redirected to WhatsApp to complete sending. Please ensure you have the official WhatsApp desktop application installed."
            : "You'll be redirected to your default email application to complete sending"}
        </p> */}
      </div>

      <button onClick={() => {
        resetModal();
        onClose();
      }} 
        className="bg-teal-500 text-white w-full py-3 rounded-md hover:bg-teal-600 transition duration-300 mt-6 font-medium"
      >
        DONE
      </button>
    </div>
  );
};

export default SendingModal;