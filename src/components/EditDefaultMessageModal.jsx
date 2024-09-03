import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa';

const EditDefaultMessageModal = ({ isOpen, onClose, onSave, templateMessage, name }) => {
  const [defaultMessage, setDefaultMessage] = useState("");

  const handleInputChange = (e) => {
    setDefaultMessage(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(defaultMessage);
  }

  useEffect(() => {
    setDefaultMessage(templateMessage);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white rounded-lg shadow-xl p-8 max-w-xl w-full m-4">
        <h2 className="text-2xl font-bold mb-2">
          Edit Default Message
        </h2>
        <p className='mb-2'>For {name}</p>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <textarea
              id="message"
              name="template"
              value={defaultMessage}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Hi @clientName..."
            ></textarea>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">
              You can use @clientName in this message, which will be automatically
              replaced with the relevant client name when sending.
            </p>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              ✓ UPDATE DEFAULT MESSAGE
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditDefaultMessageModal