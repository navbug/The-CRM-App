import React, { useState } from 'react';

const ClientNotesModal = ({ isOpen, onClose, onSave, initialNotes }) => {
  const [notes, setNotes] = useState(initialNotes || '');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-5 border-b">
          <h3 className="text-xl font-semibold">Client Notes</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5">
          <textarea
            className="w-full h-40 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter notes about your client..."
          ></textarea>
        </div>
        <div className="p-5">
          <button
            onClick={handleSave}
            className="w-full bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition duration-300 flex items-center justify-center"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientNotesModal;