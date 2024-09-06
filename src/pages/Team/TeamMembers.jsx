import React, { useEffect, useState } from "react";
import InviteTeamMembersModal from "../../components/InviteTeamMembersModal";
import InvitationSentModal from "../../components/InvitationSentModal";
import { TiTick } from "react-icons/ti";
import { FaPlus } from "react-icons/fa6";
import { fetchUsers } from "../../api";
import Loading from "../../components/Loading";
import { PuffLoader } from "react-spinners";

const TeamMembers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInviteSent, setIsInviteSent] = useState(false);
  let [users, setUsers] = useState([]);
  let [loading, setLoading] = useState(true);

  const getAllUsers = async () => {
    const fetchedUsers = await fetchUsers();
    setUsers(fetchedUsers);

    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openInviteModal = () => setIsInviteSent(true);
  const closeInviteModal = () => setIsInviteSent(false);

  const onInvitationSent = () => {};

  return (
    <div className="container mx-auto px-4">
      {loading && (
        <Loading>
          <PuffLoader color="#09e34f" speedMultiplier={3} />
        </Loading>
      )}

      {!loading && users.length > 0 && (
        <div>
          <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center mb-6 mt-4">
            <button
              onClick={openModal}
              className="flex justify-center items-center gap-1 bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition duration-300"
            >
              <FaPlus /> INVITE MEMBERS
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">NAME</th>
                  <th className="text-left py-2">STATUS</th>
                  {/* <th className="text-left py-2">PERMISSIONS</th> */}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr className="border-b">
                    <td className="py-4">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-gray-500">{user.email}</div>
                    </td>
                    <td className="py-4">
                      <span className="text-teal-500 flex items-center">
                        <TiTick />
                        Active
                      </span>
                    </td>
                    {/* <td className="py-4">
                      <div className="text-sm">ALL</div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <InviteTeamMembersModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onInvitationSent={openInviteModal}
      />

      <InvitationSentModal isOpen={isInviteSent} onClose={closeInviteModal} />
    </div>
  );
};

export default TeamMembers;
