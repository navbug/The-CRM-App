import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FollowUps = () => {
  const clientInfo = useSelector((state) => state.client.clientInfo);
  const navigate = useNavigate();

  return (
    <div>
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          
          {/* Calender bar  */}

        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4 font-medium text-gray-500">FOLLOW UP
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
              <th className="text-left py-2 px-4 font-medium text-gray-500">NAME</th>
              <th className="text-left py-2 px-4 font-medium text-gray-500">DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {clientInfo?.map((client, index) => (
              <tr onClick={() => {
                navigate(`/client/${client.id}`)
              }} key={index} className="border-b hover:bg-gray-50 cursor-pointer">
                <td className="py-3 px-4">{client.dateAdded}</td>
                <td className="py-3 px-4">{client.clientName}</td>
                <td className="py-3 px-4">-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FollowUps;