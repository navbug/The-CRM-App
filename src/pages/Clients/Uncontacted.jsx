import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Uncontacted = () => {
  const clientInfo = useSelector((state) => state.client.clientInfo);
  const navigate = useNavigate();
  
  return (
    <div>

      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* <div className="relative flex-grow">
            <input
              type="text"
              className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Search Clients"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          </div> */}
          {/* <div className="relative">
            <select
              className="appearance-none bg-gray-100 border border-gray-300 rounded-md py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option>All Groups</option>
            </select>
            <svg
              className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div> */}
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4 font-medium text-gray-500">NAME</th>
              <th className="text-left py-2 px-4 font-medium text-gray-500">SOURCE</th>
              <th className="text-left py-2 px-4 font-medium text-gray-500">DETAILS</th>
              <th className="text-left py-2 px-4 font-medium text-gray-500">
                DATE ADDED
                <svg
                  className="inline-block ml-1 h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </th>
            </tr>
          </thead>
          <tbody>
            {clientInfo?.map((client, index) => (
              <tr onClick={() => {
                // navigate(`/client/${client.id}`)
              }} key={index} className="border-b hover:bg-gray-50 cursor-pointer">
                <td className="py-3 px-4">{client.clientName}</td>
                <td className="py-3 px-4">LinkedIN</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4">{client.dateAdded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Uncontacted;