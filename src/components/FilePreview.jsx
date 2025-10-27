import React, { useEffect, useState } from 'react';
import { FaFile, FaWhatsapp } from 'react-icons/fa';
import { IoIosArrowBack } from "react-icons/io";
import { IoSend } from 'react-icons/io5';

const FilePreview = ({ file, onBack, onSend, selectedOption, clientName }) => {
  let [templateMessageToSend, setTemplateMessageToSend] = useState
  ("");

  const modifyTemplateMessage = () => {
    setTemplateMessageToSend(file.template.replace("@clientName", clientName));
  };

  useEffect(() => {
    modifyTemplateMessage();
  }, []);

  console.log(file);
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="text-teal-500 hover:text-teal-600 flex items-center text-sm font-semibold gap-2"
        >
          <IoIosArrowBack className='text-lg'/>
          BACK
        </button>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center mr-4">
          <FaFile className='w-8 h-8 text-gray-800'/>
        </div>
        <div>
          <h2 className="font-semibold text-gray-800">{file.title}</h2>
          <p className="text-sm text-gray-500">{file.mimeType}</p>
        </div>
      </div>
      
      <div className="flex-grow flex flex-col h-[200px]">
        <textarea
          value={templateMessageToSend}
          readOnly
          className="flex-grow flex-1 w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="Enter your message here..."
        />
      </div>

      <button onClick={() => onSend(`${templateMessageToSend} http://localhost:4000${file.fileLink}`, "file")}
        className="bg-teal-500 text-white px-4 py-3 rounded-md hover:bg-teal-600 transition duration-300 mt-6 flex items-center justify-center text-sm font-medium gap-3"
      >
        <IoSend className='w-4 h-4'/> SEND VIA {selectedOption.toUpperCase()}
      </button>
    </div>
  );
};

export default FilePreview;