import React, { useState, useCallback } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { FaUpload, FaPlus } from "react-icons/fa6";

import { contentTabs } from '../../constants';
import NewMessageTemplateModal from '../../components/NewMessageTemplateModal';
import FileUploadModal from '../../components/FileUploadModal';
import { MdFileUpload } from 'react-icons/md';
import { API_BASE_URL } from '../../../config';
import axios from 'axios';

const Content = () => {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const location = useLocation();

  const tabName = location.pathname.split('/')[2];

  const handleOpenMessageModal = useCallback(() => setIsMessageModalOpen(true), []);
  const handleCloseMessageModal = useCallback(() => setIsMessageModalOpen(false), []);
  const handleOpenFileModal = useCallback(() => setIsFileModalOpen(true), []);
  const handleCloseFileModal = useCallback(() => setIsFileModalOpen(false), []);

  const renderAddButton = () => {
    switch(tabName) {
      case 'messages':
        return (
          <button onClick={handleOpenMessageModal} className="add-button flex items-center gap-1">
            <FaPlus /> New Message
          </button>
        );
      case 'files':
        return (
          <button onClick={handleOpenFileModal} className="add-button flex items-center gap-1">
            <MdFileUpload /> Upload File
          </button>
        );
      case 'pages':
        return (
          <Link to="/content/pages/new" className="add-button flex items-center gap-1">
            <FaPlus /> Create Page
          </Link>
        );
      default:
        return null;
    }
  };

  const handleAddMessage = async (message) => {
    console.log(message);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/content/message`,
        message,
        { headers: { "Content-Type": "application/json" } }
      );
      if(response.status === 201) {
        console.log("MESSAGE ADDED");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Content</h1>
        <div className='bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out'>{renderAddButton()}</div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <nav className="flex border-b">
          {contentTabs.map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.path}
              end={tab.path === '/content/messages'}
              className={({ isActive }) =>
                `py-4 px-6 font-medium ${
                  isActive
                    ? 'border-b-2 border-teal-500 text-teal-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </nav>
        <Outlet />
      </div>

      <NewMessageTemplateModal 
        isOpen={isMessageModalOpen} 
        onClose={handleCloseMessageModal}
        addMessage={handleAddMessage}
      />
      <FileUploadModal 
        isOpen={isFileModalOpen} 
        onClose={handleCloseFileModal} 
      />
    </div>
  );
};

export default Content;