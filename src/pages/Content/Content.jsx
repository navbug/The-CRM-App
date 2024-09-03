import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { FaUpload, FaPlus } from "react-icons/fa6";

import { contentTabs } from '../../constants';
import FileUploadModal from '../../components/FileUploadModal';
import { MdFileUpload } from 'react-icons/md';
import { API_BASE_URL } from '../../../config';
import MessageTemplateModal from '../../components/MessageTemplateModal';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, fetchFiles, fetchMessages } from '../../api';
import { addFileDetails, addMessageDetails, setInitialFiles, setInitialMessages } from '../../redux/reducers/contentReducer';
import toast from 'react-hot-toast';

const Content = () => {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const tabName = location.pathname.split('/')[2];

  const handleOpenMessageModal = useCallback(() => setIsMessageModalOpen(true), []);
  const handleCloseMessageModal = useCallback(() => setIsMessageModalOpen(false), []);
  const handleOpenFileModal = useCallback(() => setIsFileModalOpen(true), []);
  const handleCloseFileModal = useCallback(() => setIsFileModalOpen(false), []);

  const handleFileUploaded = useCallback(async (file) => {
    const fetchedFiles = await fetchFiles();
    dispatch(setInitialFiles(fetchedFiles));
    handleCloseFileModal();

    toast.success(`Added New File Template 🔗`);
  }, []);

  const handleAddMessage = async (message) => {
    await addMessage(message);
    const fetchedMessages = await fetchMessages();
    dispatch(setInitialMessages(fetchedMessages));

    toast.success(`Added New Message Template 🔗`);
  }

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

      <MessageTemplateModal 
        isOpen={isMessageModalOpen} 
        onClose={handleCloseMessageModal}
        onSave={handleAddMessage}
      />
      <FileUploadModal 
        isOpen={isFileModalOpen} 
        onClose={handleCloseFileModal} 
        onFileUploaded={handleFileUploaded}
      />
    </div>
  );
};

export default Content;