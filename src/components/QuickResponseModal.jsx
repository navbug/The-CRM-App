import React, { useState } from 'react';
import MessagesTab from "./MessagesTab";
import FilesTab from "./FilesTab";
import PagesTab from "./PagesTab";
import MessagePreview from "./MessagePreview";
import FilePreview from "./FilePreview";
import PagePreview from "./PagePreview";
import SendingModal from './SendingModal';

const QuickResponseModal = ({ isOpen, onClose, clientName }) => {
  const [tabs, setTabs] = useState(["Messages", "Files", "Pages"]);
  const [activeTab, setActiveTab] = useState('Messages');
  const [selectedOption, setSelectedOption] = useState('WhatsApp');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleBackToMessages = () => {
    setSelectedMessage(null);
  };

  const handleSendMessage = () => {
    // Implement send functionality here
    // console.log('Sending message:', selectedMessage);
    // onClose();
    setIsSending(true);
  };

  const handleSelectFile = (file) => {
    setSelectedFile(file);
  };

  const handleSelectPage = (page) => {
    setSelectedPage(page);
  };

  const resetModal = () => {
    setSelectedMessage(null);
    setSelectedFile(null);
    setSelectedPage(null);
    setIsSending(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 h-[80vh] flex">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition duration-150"
          aria-label="Close modal"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {/* Left Section */}
        {!isSending && <div className="w-1/4 bg-gray-100 p-6 border-r">
          <h2 className="text-xl font-semibold text-gray-700">Send Quick Response to</h2>
          <h1 className="text-2xl font-bold text-blue-600 mt-2">{clientName}</h1>
          <p className="text-sm text-gray-500">(rohan)</p>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700">Sending via:</h3>
            <div className="space-y-3 mt-3 max-w-40">
              {['WhatsApp', 'Email'].map((option) => (
                <button
                  key={option}
                  className={`w-full text-left px-4 py-2 rounded-full flex flex-col ${selectedOption === option ? 'bg-blue-100 border border-blue-500' : 'bg-white border'
                    }`}
                  onClick={() => setSelectedOption(option)}
                >
                  <span className="flex items-center">
                    {/* Add appropriate icon here */}
                    <span className="ml-2">{option}</span>
                  </span>
                  <span className="text-sm text-gray-500">
                    {option === 'Email' ? 'pagdi@raj.com' : '+917878496574'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>}

        {/* Right Section */}
        <div className={`${!isSending && "w-3/4"} w-full flex flex-col`}>
          {isSending ? (
            <SendingModal
              onBack={() => setIsSending(false)}
              onClose={onClose}
              selectedOption={selectedOption}
              message={selectedMessage || selectedFile || selectedPage}
              resetModal={resetModal}
              recipient={{
                name: clientName,
                phone: '+917878496574',
                email: 'pagdi@raj.com'
              }}
            />
          ) : !selectedMessage && !selectedFile && !selectedPage ? (
            <>
              <div className="flex border-b">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex-grow overflow-y-auto p-4">
                {activeTab === 'Messages' && <MessagesTab onSelectMessage={handleSelectMessage} />}
                {activeTab === 'Files' && <FilesTab onSelectFile={handleSelectFile} />}
                {activeTab === 'Pages' && <PagesTab onSelectPage={handleSelectPage} />}
              </div>
            </>
          ) : (
            <div className='p-6'>
              {selectedMessage && (
                <MessagePreview
                  message={selectedMessage}
                  onBack={handleBackToMessages}
                  onSend={handleSendMessage}
                  selectedOption={selectedOption}
                />
              )}
              {selectedFile && (
                <FilePreview
                  file={selectedFile}
                  onBack={() => setSelectedFile(null)}
                  onSend={handleSendMessage}
                  selectedOption={selectedOption}
                />
              )}
              {selectedPage && (
                <PagePreview
                  page={selectedPage}
                  onBack={() => setSelectedPage(null)}
                  onSend={handleSendMessage}
                  selectedOption={selectedOption}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickResponseModal;