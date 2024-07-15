import React, { useState } from 'react';

const MessagePreview = ({ message, onBack, onSend, selectedOption }) => {

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
      
      <div className="font-semibold mb-4 text-gray-800 bg-gray-100 px-4 py-2 rounded-lg">
        {message.title}
      </div>
      
      <div className="flex-grow flex flex-col h-[200px]">
        <textarea
          value={message.preview}
          // onChange={(e) => setMessageContent(e.target.value)}
          className="flex-grow flex-1 w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="Enter your message here..."
        />
      </div>
      
      <button 
        // onClick={() => onSend(messageContent)}
        className="bg-teal-500 text-white px-4 py-3 rounded-md hover:bg-teal-600 transition duration-300 mt-6 flex items-center justify-center text-sm font-medium"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        SEND VIA {selectedOption.toUpperCase()}
      </button>
    </div>
  );
};

export default MessagePreview;