import React, { useState } from 'react';
import { FaTimes, FaCloudUploadAlt, FaCheck } from 'react-icons/fa';

const FileUploadModal = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Simulating upload process
      setTimeout(() => {
        setUploadComplete(true);
      }, 1000);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      // Simulating upload process
      setTimeout(() => {
        setUploadComplete(true);
      }, 1000);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setUploadComplete(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg w-[500px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Upload New File</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={24} />
          </button>
        </div>

        {!selectedFile && (
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <FaCloudUploadAlt size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">Drag and drop a PDF file here</p>
            <button
              className="text-teal-500 font-medium"
              onClick={() => document.getElementById('fileInput').click()}
            >
              BROWSE FILES
            </button>
            <input
              id="fileInput"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        )}

        {selectedFile && !uploadComplete && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Uploading file...</p>
          </div>
        )}

        {selectedFile && uploadComplete && (
          <div>
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gray-200 rounded-lg p-4">
                <FaCheck size={32} className="text-teal-500" />
              </div>
            </div>
            <p className="text-center font-medium mb-2">{selectedFile.name}</p>
            <p className="text-center text-teal-500 mb-4">Upload Completed!</p>
            <button
              className="w-full text-teal-500 font-medium py-2 border border-teal-500 rounded-lg mb-4"
              onClick={resetUpload}
            >
              CHANGE FILE
            </button>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">FILE TITLE</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                defaultValue={selectedFile.name.replace('.pdf', '')}
              />
            </div>
            <button
              className="w-full bg-teal-500 text-white font-medium py-3 rounded-lg"
              onClick={onClose}
            >
              CREATE FILE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadModal;