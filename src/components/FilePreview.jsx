import React from 'react';

const FilePreview = ({ file, onBack, onSend, selectedOption }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="text-teal-500 hover:text-teal-600 flex items-center text-sm font-medium"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          BACK
        </button>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center mr-4">
          {/* Add appropriate file icon here */}
        </div>
        <div>
          <h2 className="font-semibold text-gray-800">{file.name}</h2>
          <p className="text-sm text-gray-500">{file.type} • {file.size}</p>
        </div>
      </div>
      
      <div className="flex-grow">
        {/* Add file preview here if applicable */}
      </div>
      
      <div className="mt-4">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="Add a message (optional)"
          rows="3"
        ></textarea>
      </div>
      
      <button 
        className="bg-teal-500 text-white px-4 py-3 rounded-md hover:bg-teal-600 transition duration-300 mt-6 flex items-center justify-center text-sm font-medium"
      >
        SEND VIA {selectedOption.toUpperCase()}
      </button>
    </div>
  );
};

export default FilePreview;