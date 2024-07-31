import React, { useState } from 'react'

const TeamMemberTable = ({ teamMembers, setTeamMembers }) => {
  const toggleAssignLeads = (index) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index].assignLeads = !updatedMembers[index].assignLeads;
    setTeamMembers(updatedMembers);
  };

  const updateLeadsPerRound = (index, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index].leadsPerRound = value;
    setTeamMembers(updatedMembers);
  };

  return (
    <div className="overflow-x-auto -mx-6 sm:-mx-0">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">NAME</th>
            <th className="px-4 py-2 text-left">ASSIGN LEADS</th>
            <th className="px-4 py-2 text-left">LEADS/ROUND</th>
            <th className="px-4 py-2 text-left hidden sm:table-cell">ROUND STATUS</th>
            <th className="px-4 py-2 text-left hidden sm:table-cell">LAST LEAD RECEIVED</th>
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
              <td className="px-4 py-2">
                <select
                  value={member.leadsPerRound}
                  onChange={(e) => updateLeadsPerRound(index, parseInt(e.target.value))}
                  className="border rounded px-2 py-1"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} lead{num > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-2 hidden sm:table-cell">{member.roundStatus}</td>
              <td className="px-4 py-2 hidden sm:table-cell">{member.lastLeadReceived}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const LeadAssignment = () => {
  const [assignmentRule, setAssignmentRule] = useState('automatic');
  const [teamMembers, setTeamMembers] = useState([
    { name: 'ghost cube', email: 'ghostcube898@gmail.com', assignLeads: true, leadsPerRound: 1, roundStatus: '0 of 1 leads received', lastLeadReceived: '-' },
    { name: 'onealias01@gmail.com', email: 'onealias01@gmail.com', assignLeads: true, leadsPerRound: 1, roundStatus: '0 of 1 leads received', lastLeadReceived: '-' },
  ]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Lead Assignment</h2>
      {assignmentRule === 'automatic' && (
        <div>
          <TeamMemberTable teamMembers={teamMembers} setTeamMembers={setTeamMembers} />
        </div>
      )}
    </div>
  );
};

export default LeadAssignment;