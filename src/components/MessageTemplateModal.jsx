import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { formatDateWithYear } from "../utils";

const MessageTemplateModal = ({ isOpen, onClose, onSave, initialMessage = null }) => {
  const [message, setMessage] = useState({
    title: "",
    template: "",
    sent: 0,
    lastSent: "",
    activity: [],
    created: "",
    lastUpdated: "",
  });

  const isEditMode = !!initialMessage;

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [initialMessage]);

  console.log(initialMessage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = formatDateWithYear(new Date());
    
    const updatedMessage = {
      ...message,
      lastUpdated: currentDate,
    };

    if (!isEditMode) {
      updatedMessage.activity = [{
        details: "Message Created",
        dateAndTime: currentDate,
      }];
      updatedMessage.created = currentDate;
    } else {
      updatedMessage.activity = [
        ...message.activity,
        {
          details: "Message Updated",
          dateAndTime: currentDate,
        }
      ];
    }

    console.log(updatedMessage);
    onSave(updatedMessage);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white rounded-lg shadow-xl p-8 max-w-xl w-full m-4">
        <h2 className="text-2xl font-bold mb-6">
          {isEditMode ? "Edit Message Template" : "New Message Template"}
        </h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={message.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Call scheduled for this thursday @ 10:00 AM"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Template Message
            </label>
            <textarea
              id="message"
              name="template"
              value={message.template}
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
              {isEditMode ? "✓ UPDATE MESSAGE" : "✓ CREATE MESSAGE"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageTemplateModal;