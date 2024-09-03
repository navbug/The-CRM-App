import React, { useEffect, useState } from "react";
import { FaAngleDown, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { groupOptions } from "../../constants";
import { fetchClients } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setInitialClients } from "../../redux/reducers/clientReducer";
import Loading from "../../components/Loading";
import NoDataWrapper from "../../components/NoDataWrapper";
import { PuffLoader } from "react-spinners";

const AllClients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [clientsInfo, setClientsInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const clientsInformation = useSelector((state) => state.client.clientsInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(clientsInformation);

  const fetchAllClients = async () => {
    let fetchedClients = await fetchClients();
    setClientsInfo(fetchedClients);
    dispatch(setInitialClients(fetchedClients));

    setLoading(false);
  };

  useEffect(() => {
    fetchAllClients();
  }, []);

  const toggleGroupModal = () => {
    setIsGroupModalOpen(!isGroupModalOpen);
  };

  const toggleGroup = (groupName) => {
    setSelectedGroups((prevGroups) =>
      prevGroups.includes(groupName)
        ? prevGroups.filter((g) => g !== groupName)
        : [...prevGroups, groupName]
    );
  };

  const filteredClients = clientsInformation.filter((client) => {
    const matchesSearch = client.clientName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGroup =
      selectedGroups.length === 0 ||
      selectedGroups.some((group) => client.groups.includes(group));
    return matchesSearch && matchesGroup;
  });

  return (
    <div>
      {loading && (
        <Loading>
          <PuffLoader color="#09e34f" speedMultiplier={3} />
        </Loading>
      )}
      {!loading && clientsInfo.length === 0 && (
        <NoDataWrapper>No Clients Found.</NoDataWrapper>
      )}
      {!loading && clientsInfo.length > 0 && (
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
            <div className="relative flex items-center">
              <button
                onClick={toggleGroupModal}
                className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500 flex items-center justify-between w-full"
              >
                {selectedGroups.length > 0
                  ? `${selectedGroups.length} Groups Selected`
                  : "All Groups"}
              </button>
            </div>
          </div>

          {isGroupModalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
              <div className="bg-white p-5 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Select Groups</h2>
                <div className="space-y-2">
                  {groupOptions.map((group) => (
                    <div key={group.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`group-${group.id}`}
                        checked={selectedGroups.includes(group.name)}
                        onChange={() => toggleGroup(group.name)}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`group-${group.id}`}
                        className={`${group.color} px-2 py-1 rounded-md text-sm`}
                      >
                        {group.name}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={toggleGroupModal}
                    className="px-4 py-2 bg-teal-500 text-white rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {filteredClients.length === 0 && <NoDataWrapper height={10}>No Client</NoDataWrapper>}
          {filteredClients.length > 0 && (
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
                  <th className="text-left py-2 px-4 font-medium text-gray-500">
                    DATE ADDED
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-500">
                    GROUPS
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client, index) => (
                  <tr
                    onClick={() => navigate(`/client/${client?._id}`)}
                    key={index}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="py-3 px-4">{client.clientName}</td>
                    <td className="py-3 px-4">
                      {client?.notes ? client.notes : "-"}
                    </td>
                    <td className="py-3 px-4">{client.lastActivity || "-"}</td>
                    <td className="py-3 px-4">{client.dateAdded}</td>
                    <td className="w-72 flex flex-wrap py-3 px-4">
                      {client.groups.map((group, idx) => (
                        <span
                          key={idx}
                          className={`${
                            groupOptions.find((g) => g.name === group)?.color ||
                            ""
                          } flex justify-center px-2 py-1 rounded-md text-sm mr-1 mb-2 max-h-28 overflow-auto`}
                        >
                          {group}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AllClients;
