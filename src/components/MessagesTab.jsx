import { useSelector } from "react-redux";
import { FaGreaterThan } from "react-icons/fa6";
import { FaAngleRight, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchMessages } from "../api";
import Loading from "./Loading";
import { PuffLoader } from "react-spinners";
import NoDataWrapper from "./NoDataWrapper";

const MessagesTab = ({ onSelectMessage }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllMessages = async () => {
    const fetchedMessages = await fetchMessages();
    setMessages(fetchedMessages);

    setLoading(false);
  };

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
        <NoDataWrapper>No Message Templates.</NoDataWrapper>
      )}
      {!loading && messages.length > 0 && <div className="w-full space-y-4 mt-4">
        {messages?.map((message, index) => (
          <div key={index} className="border rounded-md p-4 relative">
            <h3 className="font-semibold">{message.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{message.template}</p>
            <div className="flex gap-2">
              <p className="text-xs text-gray-400 mt-2">{`Sent ${message.sent} time(s)`}</p>
            </div>
            <button
              onClick={() => onSelectMessage(message)}
              className="absolute flex items-center gap-2 right-4 top-1/2 transform -translate-y-1/2 bg-teal-500 text-white px-4 py-1 font-semibold rounded-sm hover:bg-teal-600 transition duration-300"
            >
              Select <FaAngleRight className="w-2 h-4" />
            </button>
          </div>
        ))}
      </div>}
    </div>
  );
};

export default MessagesTab;
