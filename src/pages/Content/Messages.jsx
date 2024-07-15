import React from 'react'
import { FaChevronUp } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Messages = () => {
  const messages = useSelector((state) => state.content.messages);
  const navigate = useNavigate();
  console.log(messages);

  return (
    <div>
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Search messages..."
              // value={searchQuery}
              onChange={(e) => {}}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {/* <div className="relative">
            <select
              className="appearance-none bg-gray-100 border border-gray-300 rounded-md py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
              // value={selectedGroup}
              onChange={(e) => {}}
            >
              <option>All Groups <FaChevronUp className='w-2 h-2'/></option>
            </select>
          </div> */}
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4 font-medium text-gray-500 flex items-center gap-1">TITLE <FaChevronUp className='w-2 h-2'/></th>
              <th className="text-left py-2 px-4 font-medium text-gray-500">MESSAGE PREVIEW</th>
              <th className="text-left py-2 px-4 font-medium text-gray-500">SENT</th>
              <th className="text-left py-2 px-4 font-medium text-gray-500">LAST SENT</th>
            </tr>
          </thead>
          <tbody>
            {messages?.map((message, index) => (
              <tr onClick={() => navigate(`/content/message/${message.id}`)} key={index} className="border-b hover:bg-gray-50 cursor-pointer">
                <td className="py-3 px-4">{message.title.slice(0, 20)}</td>
                <td className="py-3 px-4">{message.preview.slice(0, 20)}{`...`}</td>
                <td className="py-3 px-4">{message.sentTimes}</td>
                <td className="py-3 px-4">{message.lastSent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Messages