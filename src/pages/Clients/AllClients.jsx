import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaAngleDown, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config";

const AllClients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All Groups");
  // const clientInfo = useSelector((state) => state.client.clientInfo);
  const [clientInfo, setClientInfo] = useState([]);
  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/clients/all`, {headers: {'Content-Type': 'application/json'}}
      );
      if(response.status === 200) {
        console.log(response.data.clients);
        setClientInfo(response.data.clients);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div>
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow flex items-center">
            <input
              type="text"
              className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Search Clients"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-2 mx-auto text-gray-500" />
          </div>
          <div className="relative flex items-center ">
            <select
              className="appearance-none bg-gray-100 border border-gray-300 rounded-md py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option>All Groups</option>
            </select>
              <FaAngleDown className="absolute right-2"/>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4 font-medium text-gray-500">
                NAME
              </th>
              <th className="text-left py-2 px-4 font-medium text-gray-500">
                DETAILS
              </th>
              <th className="text-left py-2 px-4 font-medium text-gray-500">
                LAST ACTIVITY
              </th>
              <th className="text-left py-2 px-4 font-medium text-gray-500 flex items-center gap-2">
                DATE ADDED
                <FaAngleDown />
              </th>
            </tr>
          </thead>
          <tbody>
            {clientInfo?.map((client, index) => (
              <tr
                onClick={() => navigate(`/client/${client?._id}`)}
                key={index}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="py-3 px-4">{client.clientName}</td>
                <td className="py-3 px-4">
                  {client?.notes ? client.notes : "-"}
                </td>
                <td className="py-3 px-4">
                  <span>-</span>
                  {client.lastActivity}
                </td>
                <td className="py-3 px-4">{client.dateAdded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllClients;
