import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config";
import axios from "axios";
import { fetchClients } from "../../api";
import Loading from "../../components/Loading";
import { PuffLoader } from "react-spinners";
import NoDataWrapper from "../../components/NoDataWrapper";

const Uncontacted = () => {
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

  const uncontactedClients = clientInfo.filter((client, index) => {
    return !client.contacted;
  });

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

  if (uncontactedClients.length === 0) {
    return <NoDataWrapper>No Uncontacted Clients</NoDataWrapper>;
  }

  return (
    <div className="p-4">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-4 font-medium text-gray-500">
              NAME
            </th>
            <th className="text-left py-2 px-4 font-medium text-gray-500">
              SOURCE
            </th>
            <th className="text-left py-2 px-4 font-medium text-gray-500">
              DETAILS
            </th>
            <th className="text-left py-2 px-4 font-medium text-gray-500">
              DATE ADDED
            </th>
          </tr>
        </thead>
        <tbody>
          {uncontactedClients?.map((client, index) => (
            <tr
              onClick={() => {
                navigate(`/client/${client?._id}`);
              }}
              key={index}
              className="border-b hover:bg-gray-50 cursor-pointer"
            >
              <td className="py-3 px-4">{client.clientName}</td>
              <td className="py-3 px-4">-</td>
              <td className="py-3 px-4">{client.notes ? client.notes : "-"}</td>
              <td className="py-3 px-4">{client.dateAdded}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Uncontacted;
