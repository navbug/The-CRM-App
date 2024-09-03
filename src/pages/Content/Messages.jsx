import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaChevronUp, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchMessages } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setInitialMessages } from "../../redux/reducers/contentReducer";
import Loading from "../../components/Loading";
import { PuffLoader } from "react-spinners";
import NoDataWrapper from "../../components/NoDataWrapper";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { messages: messagesInformation } = useSelector(
    (state) => state.content
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchAllMessages = async () => {
    const fetchedMessages = await fetchMessages();
    setMessages(fetchedMessages);
    dispatch(setInitialMessages(fetchedMessages));

    setLoading(false);
  };

  const filteredMessages = messagesInformation.filter((message) =>
    message.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchAllMessages();
  }, []);

  return (
    <div>
      {loading && (
        <Loading>
          <PuffLoader color="#09e34f" speedMultiplier={3} />
        </Loading>
      )}
      {!loading && messages.length === 0 && (
        <NoDataWrapper>No Messages Found.</NoDataWrapper>
      )}
      {!loading && messages.length > 0 && (
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow flex items-center">
              <input
                type="text"
                className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-2 mx-auto text-gray-500" />
            </div>
          </div>

          {filteredMessages.length === 0 && (
            <NoDataWrapper height={10}>No Message</NoDataWrapper>
          )}
          {filteredMessages.length > 0 && (
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
                {filteredMessages?.map((message, index) => (
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
                    <td className="py-3 px-4">
                      {message.lastSent ? message.lastSent : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
