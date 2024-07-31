import { useSelector } from "react-redux";
import { FaGreaterThan } from "react-icons/fa6";
import { FaAngleRight, FaSearch } from "react-icons/fa";

const MessagesTab = ({ onSelectMessage }) => {
  const messages = useSelector((state) => state.content.messages);
  console.log(messages);

  return <div>
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Search files"
        className="w-full px-4 py-2 bg-gray-100 rounded-md"
      />
      <FaSearch className="absolute right-2 mx-auto text-gray-500" />
    </div>
    <div className="w-full space-y-4 mt-4">
      {messages.map((message, index) => (
        <div key={index} className="border rounded-md p-4 relative">
          <h3 className="font-semibold">{message.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{message.preview}</p>
          <div className="flex gap-2">
            <p className="text-xs text-gray-400 mt-2">{`Sent ${message.sentTimes} time(s) | Last Sent ${message.lastSent}`}</p>
          </div>
          <button onClick={() => onSelectMessage(message)} className="absolute flex items-center gap-2 right-4 top-1/2 transform -translate-y-1/2 bg-teal-500 text-white px-4 py-1 rounded-md hover:bg-teal-600 transition duration-300">
            Select <FaAngleRight className="w-2 h-4" />
          </button>
        </div>
      ))}
    </div>
  </div>
};

export default MessagesTab;