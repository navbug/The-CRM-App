import { useEffect, useState } from "react";
import { fetchClients, fetchClientsOfAllUsers, fetchUsers } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setInitialClients } from "../../redux/reducers/clientReducer";
import { calculateMetrics } from "../../utils";
import Loading from "../../components/Loading";
import { PuffLoader } from "react-spinners";
import NoDataWrapper from "../../components/NoDataWrapper";

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-sm font-medium text-gray-500 uppercase">{title}</h3>
    </div>
    <p className="pl-10 text-3xl font-bold text-teal-500 mb-1">{value}</p>
  </div>
);

const TeamMembersTable = ({ users }) => {
  let [allClients, setAllClients] = useState([]);
  let [loading, setLoading] = useState(true);

  const fetchAllClientsOfAllUsers = async () => {
    let fetchedClients = await fetchClientsOfAllUsers();
    setAllClients(fetchedClients);

    setLoading(false);
  };

  useEffect(() => {
    fetchAllClientsOfAllUsers();
  }, []);

  return (
    <div>
      {loading && (
        <Loading>
          <PuffLoader color="#09e34f" speedMultiplier={3} />
        </Loading>
      )}
      {!loading && users.length > 0 && allClients.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  TEAM MEMBER
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ASSIGNED CLIENTS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CONTACTED CLIENTS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  AVERAGE RESPONSE TIME
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  TOTAL ACTIVITIES
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => {
                const userClients = allClients.filter(
                  (client) => client.user === user._id
                );
                const metrics = calculateMetrics(userClients);
                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {metrics.assignedClients}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {metrics.contactedClients}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {metrics.averageResponseTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {metrics.totalActivity}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const TeamDashboard = () => {
  const [users, setUsers] = useState([]);
  const clientsInformation = useSelector((state) => state.client.clientsInfo);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getAllUsers = async () => {
    const fetchedUsers = await fetchUsers();
    setUsers(fetchedUsers);
  };

  const fetchAllClients = async () => {
    let fetchedClients = await fetchClients();
    dispatch(setInitialClients(fetchedClients));
  };

  const fetchInitialData = async () => {
    fetchAllClients();
    getAllUsers();

    setLoading(false);
  };

  const metrics = calculateMetrics(clientsInformation);

  console.log(users);

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {loading && (
        <Loading>
          <PuffLoader color="#09e34f" speedMultiplier={3} />
        </Loading>
      )}
      {!loading && users.length > 0 && clientsInformation && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="TEAM MEMBERS" value={users.length} />
            <StatCard
              title="ASSIGNED CLIENTS"
              value={metrics.assignedClients}
            />
            <StatCard
              title="CONTACTED CLIENTS"
              value={metrics.contactedClients}
            />
            <StatCard
              title="AVERAGE RESPONSE TIME"
              value={metrics.averageResponseTime}
            />
          </div>

          <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
            <div className="inline-block min-w-full align-middle">
              <TeamMembersTable users={users} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDashboard;
