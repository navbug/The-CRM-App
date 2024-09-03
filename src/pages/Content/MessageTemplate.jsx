import React, { useCallback, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaGreaterThan, FaTelegramPlane } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../config";
import axios from "axios";
import MessageTemplateModal from "../../components/MessageTemplateModal";
import { deleteMessage, updateMessage } from "../../api";
import toast from "react-hot-toast";

const MessageTemplate = () => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleOpenMessageModal = useCallback(
    () => setIsMessageModalOpen(true),
    []
  );

  const handleCloseMessageModal = useCallback(
    () => setIsMessageModalOpen(false),
    []
  );

  const fetchMessage = async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/content/message/${id}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        setMessage(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateMessage = async (updatedMessage) => {
    await updateMessage(updatedMessage);
    fetchMessage(id);

    toast.success(`Message Updated`);
  };

  const handleDeleteMessage = async () => {
    await deleteMessage(message._id);

    navigate(`/content/messages`);
    toast.remove(`Message Template Deleted`);
  }

  useEffect(() => {
    fetchMessage(id);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {message && (
        <div>
          <header className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <nav className="text-sm flex items-center">
                <NavLink
                  to="/content/messages"
                  className="text-gray-600 hover:text-gray-700 underline font-bold"
                >
                  Content
                </NavLink>
                <span className="mx-2 text-gray-600">
                  <FaGreaterThan className="w-[8px] h-[10px]" />
                </span>
                <NavLink
                  to="/content/messages"
                  className="text-gray-600 hover:text-gray-700 underline font-bold"
                >
                  Messages
                </NavLink>
                <span className="mx-2 text-gray-600">
                  <FaGreaterThan className="w-[8px] h-[10px]" />
                </span>
                <span className="text-gray-600 font-bold">
                  {message?.title}
                </span>
              </nav>
            </div>
            <div className="flex justify-between items-center relative">
              <h1 className="text-3xl font-bold">{message?.title}</h1>
              <button
                onClick={toggleOptions}
                className={`flex items-center justify-center gap-1 px-4 py-2 ${
                  isOptionsOpen
                    ? "text-white bg-teal-800"
                    : "text-gray-600 hover:bg-gray-200"
                } font-semibold rounded-sm  transition duration-300`}
              >
                Options
                <BsThreeDotsVertical />
              </button>
              {isOptionsOpen && (
                <div className="absolute top-8 right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1 cursor-pointer">
                    <div onClick={() => {
                      handleOpenMessageModal();
                      toggleOptions();
                    }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Edit Message Template
                    </div>
                    <div onClick={handleDeleteMessage} className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                      Delete Message Template
                    </div>
                  </div>
                </div>
              )}
            </div>
          </header>

          <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
            <div className="w-full">
              <h2 className="text-xl font-bold mb-4 pl-2">Preview</h2>
              <div onClick={handleOpenMessageModal} className="w-full min-h-64 space-y-4 flex bg-white rounded-sm shadow-md p-4 flex-grow gap-4 cursor-pointer">
                {message?.template}
              </div>

              <div className="text-gray-600 px-2 py-4 font-semibold">
                Message last updated {message.lastUpdated}. Created{" "}
                {message.created}.
              </div>
            </div>

            <div className="w-full">
              <h2 className="text-xl font-bold mb-4">Sharing History</h2>
              <div className="bg-white rounded-sm shadow-md px-6 py-3 flex-grow mb-4 flex justify-between font-semibold">
                <span>Total Sent</span>
                <span>{message.sent}</span>
              </div>

              <h2 className="text-xl font-bold mb-4">Timeline</h2>
              <div className="bg-white rounded-sm shadow-md p-6 flex-grow ">
                <div className="space-y-6">
                  {message.activity.map((messageActivity, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <i className="fas fa-user-plus text-gray-500"></i>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">
                          {messageActivity.dateAndTime}
                        </p>
                        <p className="font-semibold">
                          {messageActivity.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <MessageTemplateModal
        isOpen={isMessageModalOpen}
        onClose={handleCloseMessageModal}
        onSave={handleUpdateMessage}
        initialMessage={message}
      />
    </div>
  );
};

export default MessageTemplate;
