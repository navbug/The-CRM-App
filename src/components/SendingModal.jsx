import React from 'react';

const SendingModal = ({ onBack, onClose, resetModal, selectedOption, message, recipient }) => {
  const isWhatsApp = selectedOption === 'WhatsApp';

  return (
    <div className="flex flex-col h-full bg-white p-6 rounded-lg shadow-lg">
      <button 
        onClick={onBack}
        className="text-teal-500 hover:text-teal-600 flex items-center text-sm font-medium mb-6"
      >
        ← BACK
      </button>

      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <div className="text-teal-500 mb-4">
          {isWhatsApp ? (
            <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.676.872 5.147 2.343 7.144L.608 23.975l5.033-1.608C7.468 23.42 9.683 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zM9 17.25l-2.25-2.25L11 11 6 15l3 3zm6.75 0l-2.25-2.25L18 11l-5 4 3 3z"/>
            </svg>
          ) : (
            <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          )}
        </div>
        <h2 className="text-3xl font-bold text-teal-500 mb-4">
          Sending Message via {isWhatsApp ? 'WhatsApp' : 'Email'}...
        </h2>
        <p className="text-xl font-semibold mb-2">{message.title}</p>
        <p className="text-gray-600 mb-4">
          To {recipient.name} ({isWhatsApp ? recipient.phone : recipient.email})
        </p>
        <p className="text-sm text-gray-500">
          {isWhatsApp
            ? "You'll be redirected to WhatsApp to complete sending. Please ensure you have the official WhatsApp desktop application installed."
            : "You'll be redirected to your default email application to complete sending"}
        </p>
        {isWhatsApp && (
          <a 
            href="https://www.whatsapp.com/download" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-teal-500 hover:underline mt-2"
          >
            WhatsApp desktop application ↗
          </a>
        )}
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