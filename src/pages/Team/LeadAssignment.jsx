import React, { useEffect, useState } from "react";
import { fetchUsers, updateUser } from "../../api";
import Loading from "../../components/Loading";
import { PuffLoader } from "react-spinners";

const TeamMemberTable = ({ teamMembers, setTeamMembers }) => {
  const toggleAssignLeads = async (index) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index].assignLeads = !updatedMembers[index].assignLeads;
    setTeamMembers(updatedMembers);

    //API call to update user in the backend
    await updateUser(updatedMembers[index]._id, updatedMembers[index]);
  };

  return (
    <div className="overflow-x-auto -mx-6 sm:-mx-0">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">NAME</th>
            <th className="px-4 py-2 text-left">ASSIGN LEADS</th>
            <th className="px-4 py-2 text-left hidden sm:table-cell">
              LAST LEAD RECEIVED
            </th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">
                <div>{member.name}</div>
                <div className="text-sm text-gray-600">{member.email}</div>
              </td>
              <td className="px-4 py-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={member.assignLeads}
                    onChange={() => toggleAssignLeads(index)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </td>
              <td className="px-4 py-2 hidden sm:table-cell">
                {member.lastLeadReceived ? member.lastLeadReceived : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const LeadAssignment = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllUsers = async () => {
    const fetchedUsers = await fetchUsers();
    setUsers(fetchedUsers);

    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {loading && (
        <Loading>
          <PuffLoader color="#09e34f" speedMultiplier={3} />
        </Loading>
      )}
      {!loading && users.length > 0 && (
        <div>
          <div className="flex items-center gap-1 relative">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Lead Assignment{" "}
            </h2>
            <span className="text-md font-semibold absolute bottom-[18px] left-[196px]">
              (Round Robin fashion)
            </span>{" "}
          </div>
          <div>
            <TeamMemberTable teamMembers={users} setTeamMembers={setUsers} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadAssignment;
