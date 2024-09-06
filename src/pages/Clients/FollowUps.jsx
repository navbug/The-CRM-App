import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchClients } from "../../api";
import { followUpTabs } from "../../constants";
import Loading from "../../components/Loading";
import { PuffLoader } from "react-spinners";
import NoDataWrapper from "../../components/NoDataWrapper";

const FollowUps = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState({
    dueToday: [],
    upcoming: [],
    overdue: [],
  });
  const [activeTab, setActiveTab] = useState("dueToday");
  const navigate = useNavigate();

  const fetchAllClients = useCallback(async () => {
    try {
      const fetchedClients = await fetchClients();
      setClients(fetchedClients);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredClients = clients.filter(client => client.followUp);

  const categorizeClients = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const categorizedClients = clients.reduce(
      (acc, client) => {
        if (client.followUp) {
          const followUpDate = new Date(client.followUp);
          if (followUpDate < today) {
            acc.overdue.push(client);
          } else if (followUpDate >= today && followUpDate < tomorrow) {
            acc.dueToday.push(client);
          } else {
            acc.upcoming.push(client);
          }
        }
        return acc;
      },
      { dueToday: [], upcoming: [], overdue: [] }
    );

    setCategories(categorizedClients);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date.toDateString() === today.toDateString()) {
      return `Today - ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return date.toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
  };
  
  useEffect(() => {
    fetchAllClients();
  }, []);

  useEffect(() => {
    categorizeClients();
  }, [clients]);

  if (loading) {
    return (
      <Loading>
        <PuffLoader color="#09e34f" speedMultiplier={3} />
      </Loading>
    );
  }

  if (filteredClients.length === 0) {
    return <NoDataWrapper>No Clients</NoDataWrapper>;
  }

  return (
    <div className="p-4">
          <div className="flex mb-4 bg-white shadow rounded-lg overflow-hidden">
            {followUpTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-2 px-4 font-medium ${
                  activeTab === tab.key
                    ? `bg-blue-50 ${tab.color}`
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center">
                  {tab.icon}
                  {tab.label} ({categories[tab.key].length})
                </div>
              </button>
            ))}
          </div>
          {categories[activeTab].length === 0 ? (<NoDataWrapper height="20">No Follow Ups</NoDataWrapper>) : (<div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left py-2 px-4 font-medium text-gray-500">
                    FOLLOW UP
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-500">
                    NAME
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-500">
                    DETAILS
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories[activeTab].map((client) => (
                  <tr
                    key={client._id}
                    onClick={() => navigate(`/client/${client._id}`)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="py-3 px-4">{formatDate(client.followUp)}</td>
                    <td className="py-3 px-4">{client.clientName}</td>
                    <td className="py-3 px-4">
                      {client.notes ? client.notes : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>)}
    </div>
  );
};

export default FollowUps;
