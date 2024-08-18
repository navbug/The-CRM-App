import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaChevronUp, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/content/all`, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        console.log(response.data.content[0].messages);
        setMessages(response.data.content[0].messages);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow flex items-center">
            <input
              type="text"
              className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Search messages..."
              // value={searchQuery}
              onChange={(e) => {}}
            />
            <FaSearch className="absolute left-2 mx-auto text-gray-500" />
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4 font-medium text-gray-500 flex items-center gap-1">
                TITLE
              </th>
              <th className="text-left py-2 px-4 font-medium text-gray-500">
                MESSAGE PREVIEW
              </th>
              <th className="text-left py-2 px-4 font-medium text-gray-500">
                SENT
              </th>
              <th className="text-left py-2 px-4 font-medium text-gray-500">
                LAST SENT
              </th>
            </tr>
          </thead>
          <tbody>
            {messages?.map((message, index) => (
              <tr
                onClick={() => navigate(`/content/message/${message._id}`)}
                key={index}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="py-3 px-4">{message.title.slice(0, 20)}</td>
                <td className="py-3 px-4">
                  {message.template.slice(0, 20)}
                  {`...`}
                </td>
                <td className="py-3 px-4">{message.sent}</td>
                <td className="py-3 px-4">{message.lastSent ? message.lastSent : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;
