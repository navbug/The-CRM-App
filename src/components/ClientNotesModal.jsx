import React, { useState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';

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
            <FaTimes />
          </button>
        </div>
        <div className="p-5">
          <textarea
            className="w-full h-40 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about your client..."
          ></textarea>
        </div>
        <div className="p-5">
          <button
            onClick={handleSave}
            className="w-full bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition duration-300 flex items-center justify-center gap-2"
          >
            <FaSave />
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientNotesModal;