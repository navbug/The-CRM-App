import React from "react";
import { FaCirclePlus } from "react-icons/fa6";

const ClientTimeline = ({ activities, onAddActivity }) => {
  return (
    <div className="lg:w-1/2">
      <h2 className="text-xl font-bold mb-4">Timeline</h2>
      <div className="bg-white rounded-sm shadow-md p-6 flex-grow">
        <div
          onClick={onAddActivity}
          className="flex justify-start items-center gap-3 mb-4 bg-white text-teal-500 -px-4 py-2 hover:text-teal-600 transition duration-300 cursor-pointer"
        >
          <div className="">
            <FaCirclePlus className="w-8 h-8" />
          </div>
          Add Activity
        </div>
        <div className="space-y-4">
          {activities.map((activityDetail, index) => (
            <ActivityItem key={index} activity={activityDetail} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ActivityItem = ({ activity }) => (
  <div className="flex">
    <div className="flex-shrink-0 mt-1">
      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
        <i className="fas fa-user-plus text-gray-500"></i>
      </div>
    </div>
    <div className="ml-4">
      <p className="text-sm text-gray-500">{activity.dateAndTime}</p>
      <p className="font-semibold">{activity.category}</p>
      <p className="text-gray-500">{activity.details}</p>
    </div>
  </div>
);

export default ClientTimeline;