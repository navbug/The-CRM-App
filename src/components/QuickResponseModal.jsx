import React, { useState } from "react";
import MessagesTab from "./MessagesTab";
import FilesTab from "./FilesTab";
import PagesTab from "./PagesTab";
import MessagePreview from "./MessagePreview";
import FilePreview from "./FilePreview";
import PagePreview from "./PagePreview";
import SendingModal from "./SendingModal";
import { FaTimes } from "react-icons/fa";
import { formatDateWithYear } from "../utils";
import { updateClientInfo, updateFileData, updateMessage, updatePageData } from "../api";
import toast from "react-hot-toast";

const QuickResponseModal = ({ isOpen, onClose, clientInfo }) => {
  const [tabs, setTabs] = useState(["Messages", "Files", "Pages"]);
  const [activeTab, setActiveTab] = useState("Messages");
  const [selectedOption, setSelectedOption] = useState("WhatsApp");
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

  const updateActivity = (message, type) => {
    let currentDate = formatDateWithYear(new Date());
    let updatedActivity = [
      ...message.activity,
      {
        details: `${type[0].toUpperCase()}${type.slice(1)} Sent to ${clientInfo.clientName}`,
        dateAndTime: `${currentDate}`,
      },
    ];

    if(type === "message") {
      let updatedMessage = {
        ...message,
        sent: message.sent + 1,
        lastSent: currentDate,
        activity: updatedActivity,
      }
      console.log(updatedActivity, updatedMessage);
      updateMessage(updatedMessage);

    } else if(type === "file") {
      let updatedFile = {
        ...message,
        shared: message.shared + 1,
        lastShared: currentDate,
        activity: JSON.stringify(updatedActivity),
      }
      console.log(updatedActivity, updatedFile);
      updateFileData(updatedFile);

    } else if(type === "page") {
      let updatedPage = {
        ...message,
        shared: message.shared + 1,
        lastShared: currentDate,
        activity: JSON.stringify(updatedActivity),
      }
      console.log(updatedActivity, updatedPage);
      updatePageData(updatedPage);
    }
  };

  const handleSendMessage = (message, type) => {
    if (selectedOption === "WhatsApp") {
      let url = `https://web.whatsapp.com/send?phone=918278608273`;
      url += `&text=${encodeURI(message)}&app_absent=0`;

      if (type === "message") {
        updateActivity(selectedMessage, "message");
      } else if(type === "file") {
        updateActivity(selectedFile, "file");
      } else if(type === "page") {
        updateActivity(selectedPage, "page");
      }

      window.open(url);
      setIsSending(true);
    } else if (selectedOption === "Email") {
      if (type === "message" || type === "file" || type === "page") {
        let mailtoLink = `mailto:${
          clientInfo.email
        }?subject=&body=${encodeURIComponent(message)}`;

        window.open(mailtoLink);
        setIsSending(true);
      }
    }
    handleUpdateClient(clientInfo);

    toast.success(`Sent ${type} to ${clientInfo.clientName}`)
  };

  const handleUpdateClient = async (clientInfo) => {
    let updatedClientInfo = {
      ...clientInfo,
      contacted: true,
      lastActivity: formatDateWithYear(new Date()),
    }
    const clientUpdated = await updateClientInfo(updatedClientInfo);
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
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 h-[80vh] flex">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition duration-150"
          aria-label="Close modal"
        >
          <FaTimes className="w-6 h-6" />
        </button>
        {/* Left Section */}
        {!isSending && (
          <div className="w-1/4 bg-gray-100 p-6 border-r">
            <h2 className="text-xl font-semibold text-gray-700">
              Send Quick Response to
            </h2>
            <h1 className="text-2xl font-bold text-blue-600 mt-2">
              {clientInfo.clientName}
            </h1>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-700">
                Sending via:
              </h3>
              <div className="space-y-3 mt-3 max-w-40">
                {["WhatsApp", "Email"].map((option) => (
                  <button
                    key={option}
                    className={`w-full text-left px-2 py-2 rounded-lg flex flex-col items- font-semibold ${
                      selectedOption === option
                        ? "bg-blue-100 border border-blue-500 text-blue-800"
                        : "bg-white border"
                    }`}
                    onClick={() => setSelectedOption(option)}
                  >
                    <span className="flex items-center">
                      <span className="">{option}</span>
                    </span>
                    <span className="flex items-center text-sm text-gray-500">
                      {option === "Email"
                        ? `${clientInfo.email}`
                        : `${clientInfo.phoneNumber}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Right Section */}
        <div className={`${!isSending && "w-3/4"} w-full flex flex-col`}>
          {isSending ? (
            <SendingModal
              onBack={() => setIsSending(false)}
              onClose={onClose}
              selectedOption={selectedOption}
              message={selectedMessage || selectedFile || selectedPage}
              resetModal={resetModal}
            />
          ) : !selectedMessage && !selectedFile && !selectedPage ? (
            <>
              <div className="flex border-b">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 ${
                      activeTab === tab
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex-grow overflow-y-auto p-4">
                {activeTab === "Messages" && (
                  <MessagesTab onSelectMessage={handleSelectMessage} />
                )}
                {activeTab === "Files" && (
                  <FilesTab onSelectFile={handleSelectFile} />
                )}
                {activeTab === "Pages" && (
                  <PagesTab onSelectPage={handleSelectPage} />
                )}
              </div>
            </>
          ) : (
            <div className="p-6">
              {selectedMessage && (
                <MessagePreview
                  message={selectedMessage}
                  onBack={handleBackToMessages}
                  onSend={handleSendMessage}
                  selectedOption={selectedOption}
                  clientName={clientInfo.clientName}
                />
              )}
              {selectedFile && (
                <FilePreview
                  file={selectedFile}
                  onBack={() => setSelectedFile(null)}
                  onSend={handleSendMessage}
                  selectedOption={selectedOption}
                  clientName={clientInfo.clientName}
                />
              )}
              {selectedPage && (
                <PagePreview
                  page={selectedPage}
                  onBack={() => setSelectedPage(null)}
                  onSend={handleSendMessage}
                  selectedOption={selectedOption}
                  clientName={clientInfo.clientName}
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
