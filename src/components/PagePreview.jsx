import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { IoSend } from "react-icons/io5";

const PagePreview = ({ page, onBack, onSend, selectedOption, clientName }) => {
  let [templateMessageToSend, setTemplateMessageToSend] = useState
  ("");

  const modifyTemplateMessage = () => {
    setTemplateMessageToSend(page.template.replace("@clientName", clientName));
  };

  useEffect(() => {
    modifyTemplateMessage();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="text-teal-500 hover:text-teal-600 flex items-center text-sm font-medium gap-2"
        >
          <IoIosArrowBack className='text-lg'/>
          BACK
        </button>
      </div>
      
      <div className="font-semibold mb-4 text-gray-800 bg-gray-100 px-4 py-2 rounded-lg">
        {page.title}
      </div>
      
      <div className="flex-grow flex flex-col h-[200px]">
        <textarea
          value={templateMessageToSend}
          readOnly
          className="flex-grow flex-1 w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="Enter your message here..."
        />
      </div>
      
      <button onClick={() => onSend(`${templateMessageToSend} http://localhost:4000${page.pdfLink}`, "page")}
        className="bg-teal-500 text-white px-4 py-3 rounded-md hover:bg-teal-600 transition duration-300 mt-6 flex items-center justify-center text-sm font-medium gap-2"
      >
        <IoSend className='w-4 h-4'/>
        SEND VIA {selectedOption.toUpperCase()}
      </button>
    </div>
  );
};

export default PagePreview;