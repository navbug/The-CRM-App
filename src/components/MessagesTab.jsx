import { useSelector } from "react-redux";
import { FaGreaterThan } from "react-icons/fa6";

const MessagesTab = ({onSelectMessage}) => {
  const messages = useSelector((state) => state.content.messages);
  console.log(messages);

  return <div>
    <div className="relative">
      <input
        type="text"
        placeholder="Search messages"
        className="w-full px-4 py-2 bg-gray-100 rounded-md"
      />
      <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <div className="flex justify-end mt-2 text-sm text-gray-500">
      SORT BY: RECENTLY USED ▼
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
            Select <FaGreaterThan className="w-2 h-4"/>
          </button>
        </div>
      ))}
    </div>
  </div>
};

export default MessagesTab;