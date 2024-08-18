import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config';
import axios from 'axios';

const Uncontacted = () => {
  const [clientInfo, setClientInfo] = useState([]);
  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/clients/all`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.status === 200) {
        setClientInfo(response.data.clients);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const uncontactedClients = clientInfo.filter((client, index) => {
    return client.contacted;
  });

  useEffect(() => {
    fetchClients();
  }, []);
  
  return (
    <div>
      <div className="p-4">
        {uncontactedClients.length === 0 ? (
          <div className='w-full text-gray-500 font-semibold text-lg flex justify-center mt-4'>No Uncontacted Clients</div>
        ) : <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4 font-medium text-gray-500">NAME</th>
              <th className="text-left py-2 px-4 font-medium text-gray-500">SOURCE</th>
              <th className="text-left py-2 px-4 font-medium text-gray-500">DETAILS</th>
              <th className="text-left py-2 px-4 font-medium text-gray-500">
                DATE ADDED
              </th>
            </tr>
          </thead>
          <tbody>
            {uncontactedClients?.map((client, index) => (
              <tr onClick={() => {
                navigate(`/client/${client?._id}`)
              }} key={index} className="border-b hover:bg-gray-50 cursor-pointer">
                <td className="py-3 px-4">{client.clientName}</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4">{client.notes ? client.notes : "-"}</td>
                <td className="py-3 px-4">{client.dateAdded}</td>
              </tr>
            ))}
          </tbody>
        </table>}
      </div>
    </div>
  )
}

export default Uncontacted;