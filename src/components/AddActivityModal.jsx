import React, { useState } from 'react';
import { FaPhoneAlt, FaCommentAlt, FaCalendarAlt, FaStickyNote, FaTimes, FaAngleDown, FaSave } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddActivityModal = ({ isOpen, onClose, clientName }) => {
  const [activityType, setActivityType] = useState('Note');
  const [activityDate, setActivityDate] = useState(new Date());
  const [activityDetails, setActivityDetails] = useState('');

  const activityTypes = [
    { value: 'Note', icon: FaStickyNote, color: 'bg-purple-500' },
    { value: 'Phone Call', icon: FaPhoneAlt, color: 'bg-blue-500' },
    { value: 'Message', icon: FaCommentAlt, color: 'bg-pink-500' },
    { value: 'Meeting', icon: FaCalendarAlt, color: 'bg-indigo-500' },
  ];

  const selectedActivity = activityTypes.find(type => type.value === activityType);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FaTimes />
          </button>
        </div>
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Add Activity</h3>
          <div className="mt-2 px-7 py-3">
            <h4 className="text-sm text-gray-500 text-left mb-4">with {clientName}</h4>
            <div className="relative">
              <div className="flex items-center border rounded-md">
              <div className={`p-2 rounded-l-md ${selectedActivity.color}`}>
                  <selectedActivity.icon className="text-white" />
                </div>
                <select
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                  className="appearance-none bg-transparent border-none w-full py-2 pl-3 pr-8 rounded-r-md focus:outline-none"
                >
                  {activityTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.value}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FaAngleDown />
                </div>
              </div>
            </div>

            <textarea
              value={activityDetails}
              onChange={(e) => setActivityDetails(e.target.value)}
              placeholder="Details here(optional)..."
              className="w-full mt-4 p-2 border rounded-md resize-none h-32"
            />
            <div className="mt-4 w-full">
              <DatePicker
                selected={activityDate}
                onChange={(date) => setActivityDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <button
              onClick={() => {
                /* Handle save */ 
              }}
              className="w-full mt-4 bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition duration-300 flex justify-center items-center gap-2"
            >
              <FaSave />
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddActivityModal;