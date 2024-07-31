const StatCard = ({ title, value, subtext, infoIcon }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-sm font-medium text-gray-500 uppercase">{title}</h3>
      {infoIcon && (
        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      )}
    </div>
    <p className="text-3xl font-bold text-teal-500 mb-1">{value}</p>
    <p className="text-sm text-gray-500">{subtext}</p>
  </div>
);

const TeamMembersTable = () => (
  <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50">
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TEAM MEMBER</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ASSIGNED CLIENTS</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CONTACTED CLIENTS</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AVERAGE RESPONSE TIME</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL ACTIVITIES</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IN SELECT GROUP</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
          <td className="px-6 py-4 whitespace-nowrap font-medium">TOTAL</td>
          <td className="px-6 py-4 whitespace-nowrap">-</td>
          <td className="px-6 py-4 whitespace-nowrap">-</td>
          <td className="px-6 py-4 whitespace-nowrap">-</td>
          <td className="px-6 py-4 whitespace-nowrap">5</td>
          <td className="px-6 py-4 whitespace-nowrap">-</td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">
            <div>
              <div className="font-medium">ghost cube</div>
              <div className="text-sm text-gray-500">ghostcube898@gmail.com</div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">0</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div>
              <div>0</div>
              <div className="text-sm text-gray-500">0% of assigned</div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">-</td>
          <td className="px-6 py-4 whitespace-nowrap">5</td>
          <td className="px-6 py-4 whitespace-nowrap">-</td>
        </tr>
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">
            <div>
              <div className="font-medium">onealias01@gmail.com</div>
              <div className="text-sm text-gray-500">onealias01@gmail.com</div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">0</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div>
              <div>0</div>
              <div className="text-sm text-gray-500">0% of assigned</div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">-</td>
          <td className="px-6 py-4 whitespace-nowrap">0</td>
          <td className="px-6 py-4 whitespace-nowrap">-</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const TeamDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <button className="w-full bg-gray-100 text-left px-4 py-2 rounded-md flex justify-between items-center">
            <span className="font-medium">All Groups</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="w-full md:w-1/2">
          <button className="w-full bg-gray-100 text-left px-4 py-2 rounded-md flex justify-between items-center">
            <span className="font-medium">Last 7 days Jul 11 - Jul 18</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="TEAM MEMBERS" value="2" subtext="Activated accounts" infoIcon={true} />
        <StatCard title="ASSIGNED CLIENTS" value="0" subtext="of 0 added" infoIcon={true} />
        <StatCard title="CONTACTED CLIENTS" value="0" subtext="0% of clients assigned" infoIcon={true} />
        <StatCard title="AVERAGE RESPONSE TIME" value="-" subtext="for contacted clients" infoIcon={true} />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <div className="inline-block min-w-full align-middle">
          <TeamMembersTable />
        </div>
      </div>
    </div>
  );
};

export default TeamDashboard;