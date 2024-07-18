import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InviteTeamMembersModal from '../../components/InviteTeamMembersModal';
import InvitationSentModal from '../../components/InvitationSentModal';

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="mb-4 sm:mb-0">
          <p className="font-bold">1 ACTIVE TEAM ACCOUNT</p>
          <Link to="#" className="text-blue-500 hover:underline">View billing details</Link>
        </div>
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
                <span className="ml-1 inline-block">▼</span>
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
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Active
                </span>
              </td>
              <td className="py-4">
                <div className="text-sm">
                  View Clients (Self, Others, Unassigned), Add & Edit Content, Add & Edit Groups
                </div>
              </td>
              <td className="py-4">
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
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