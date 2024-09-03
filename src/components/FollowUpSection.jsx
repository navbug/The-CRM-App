import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { formatDateWithYear } from "../utils";
import toast from "react-hot-toast";

const FollowUpSection = ({ clientInfo, setClientInfo }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    clientInfo?.followUp ? new Date(clientInfo.followUp) : new Date()
  );

  const getFollowUpStatus = () => {
    if (!clientInfo?.followUp) return "No follow up scheduled";

    const followUpDate = new Date(clientInfo.followUp);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (followUpDate < today) {
      return "Follow Up Overdue";
    } else if (followUpDate.toDateString() === today.toDateString()) {
      return "Follow Up Today";
    } else {
      const diffTime = Math.abs(followUpDate - today);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `Follow Up in ${diffDays} Day${diffDays > 1 ? "s" : ""}`;
    }
  };

  const getStatusColor = () => {
    const status = getFollowUpStatus();
    if (status.includes("Overdue")) return "bg-red-100 text-red-800";
    if (status.includes("Today")) return "bg-blue-100 text-blue-800";
    if (status.includes("in")) return "bg-gray-100 text-gray-800";
    return "bg-gray-100 text-gray-600";
  };

  const formatDate = (date) => {
    return date.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(formatDateWithYear(date));
  };

  const applyFollowUp = () => {
    setClientInfo((prevState) => ({
      ...prevState,
      followUp: formatDateWithYear(selectedDate),
    }));
    setIsDatePickerOpen(false);

    toast.success(`Follow Up Scheduled`)
  };

  const removeFollowUp = () => {
    setClientInfo((prevState) => ({
      ...prevState,
      followUp: null,
    }));
    setIsDatePickerOpen(false);
    setSelectedDate(new Date());

    toast.success(`Follow Up Removed`)
  };

  return (
    <div className="my-6 bg-white p-4 rounded-md shadow">
      <div className="flex justify-between items-center ">
        <div
          className={`flex items-center justify-between gap-4 p-2 rounded-md ${getStatusColor()}`}
        >
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" />
            <span className="font-semibold">{getFollowUpStatus()}</span>
          </div>
          {clientInfo?.followUp && (
            <span>{formatDate(new Date(clientInfo.followUp))}</span>
          )}
        </div>
        <button
          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {clientInfo?.followUp ? "Change follow up" : "Schedule follow up"}
        </button>
      </div>
      {isDatePickerOpen && (
        <div className="mt-4">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full p-2 border rounded cursor-pointer"
          />
          <div className="mt-4 flex justify-between">
            <button
              onClick={applyFollowUp}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Apply
            </button>
            {clientInfo?.followUp && (
              <button
                onClick={removeFollowUp}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove follow up
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowUpSection;
