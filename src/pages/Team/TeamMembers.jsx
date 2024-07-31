import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InviteTeamMembersModal from '../../components/InviteTeamMembersModal';
import InvitationSentModal from '../../components/InvitationSentModal';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { TiTick } from 'react-icons/ti';

const TeamMembers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInviteSent, setIsInviteSent] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openInviteModal = () => setIsInviteSent(true);
  const closeInviteModal = () => setIsInviteSent(false);

  const onInvitationSent = () => {
    
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center mb-6 mt-4">
        <button onClick={openModal} className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition duration-300">
          + INVITE MEMBERS
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">NAME</th>
              <th className="text-left py-2">
                STATUS
              </th>
              <th className="text-left py-2">PERMISSIONS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-4">
                <div className="font-medium">onealias01@gmail.com</div>
                <div className="text-gray-500">onealias01@gmail.com</div>
              </td>
              <td className="py-4">
                <span className="text-teal-500 flex items-center">
                  <TiTick />
                  Active
                </span>
              </td>
              <td className="py-4">
                <div className="text-sm">
                  View Clients
                </div>
              </td>
              <td className="py-4">
                <button className="text-gray-500 hover:text-gray-700">
                  <BsThreeDotsVertical />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <InviteTeamMembersModal isOpen={isModalOpen} onClose={closeModal} onInvitationSent={openInviteModal}/>

      <InvitationSentModal isOpen={isInviteSent} onClose={closeInviteModal} />
    </div>
  );
};

export default TeamMembers;