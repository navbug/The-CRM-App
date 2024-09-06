import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchClients } from "../../api";
import Loading from "../../components/Loading";
import { PuffLoader } from "react-spinners";
import NoDataWrapper from "../../components/NoDataWrapper";

const RecentlyContacted = () => {
  const [clientInfo, setClientInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAllClients = useCallback(async () => {
    try {
      const fetchedClients = await fetchClients();
      setClientInfo(fetchedClients);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredClients = clientInfo.filter((client, index) => {
    return client.activity.length > 0;
  });

  const recentlyContacted = useMemo(() => {
    const filtered = clientInfo.filter(client => client.activity.length > 0);
    return filtered.sort((a, b) => {
      const dateA = new Date(a.activity[a.activity.length - 1]?.dateAndTime);
      const dateB = new Date(b.activity[b.activity.length - 1]?.dateAndTime);
      return dateB - dateA;
    });
  }, [clientInfo]);

  useEffect(() => {
    fetchAllClients();
  }, []);

  if (loading) {
    return (
      <Loading>
        <PuffLoader color="#09e34f" speedMultiplier={3} />
      </Loading>
    );
  }

  if (clientInfo.length === 0) {
    return (
      <NoDataWrapper height="10">No Client Contacted Recently</NoDataWrapper>
    );
  }

  return (
    <div>
      <div className="p-4">
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
            </tr>
          </thead>
          <tbody>
            {recentlyContacted?.map((client, index) => (
              <tr
                onClick={() => {
                  navigate(`/client/${client._id}`);
                }}
                key={index}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="py-3 px-4">{client.clientName}</td>
                <td className="py-3 px-4">
                  {client.notes ? client.notes : "-"}
                </td>
                <td className="py-3 px-4">
                  {client?.activity[client.activity.length - 1]?.dateAndTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentlyContacted;
