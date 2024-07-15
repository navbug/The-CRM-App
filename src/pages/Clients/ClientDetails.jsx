import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTelegramPlane, FaGreaterThan, FaPhone, FaWhatsapp } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import ClientNotesModal from '../../components/ClientNotesModal';
import QuickResponseModal from '../../components/QuickResponseModal';

const ClientDetails = () => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [clientNotes, setClientNotes] = useState('');

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const openNotesModal = () => {
    setIsNotesModalOpen(true);
  };

  const closeNotesModal = () => {
    setIsNotesModalOpen(false);
  };

  const openResponseModal = () => {
    setIsResponseModalOpen(true);
  };

  const closeResponseModal = () => {
    setIsResponseModalOpen(false);
  };

  const saveNotes = (notes) => {
    setClientNotes(notes);
    // Here you would typically save the notes to your backend
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <nav className="text-sm flex items-center">
            <NavLink to="/clients" className="text-gray-600 hover:text-gray-700 underline font-bold">Clients</NavLink>
            <span className="mx-2 text-gray-600">
              <FaGreaterThan className='w-[8px] h-[10px]' />
            </span>
            <span className="text-gray-600 font-bold">Rohan Singh</span>
          </nav>
          <div onClick={openResponseModal} className="space-x-2">
            <button className="flex items-center justify-center gap-2 bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition duration-300">
              <FaTelegramPlane />
              Send Quick Response
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center relative">
          <h1 className="text-3xl font-bold">Rohan Singh</h1>
          <button onClick={toggleOptions} className={`flex items-center justify-center gap-1 px-4 py-2 ${isOptionsOpen ? "text-white bg-teal-800" : "text-gray-600 hover:bg-gray-200"} font-semibold rounded-sm  transition duration-300`}>
            Options
            <BsThreeDotsVertical />
          </button>
          {isOptionsOpen && (
            <div className="absolute top-8 right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit Contact Details</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit Client Notes</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mark as Uncontacted</a>
                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete Client</a>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4 pl-2">Client Info</h2>
          <div className="w-full space-y-4 flex justify-around bg-white rounded-sm shadow-md p-6 flex-grow gap-4">
            <div className='flex flex-col gap-4 flex-1 px-4'>
              <div>
                <h3 className="text-sm font-bold text-gray-900">DISPLAY NAME</h3>
                <p className='mb-3'>rohan</p>
                <hr />
              </div>
              <div className='flex justify-between items-center'>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">MOBILE NUMBER</h3>
                  <p className="flex items-center gap-1">
                    <span>+916576879867</span>
                  </p>
                </div>
                <div className='cursor-pointer'>
                  <FaPhone className='w-7 h-7 text-teal-500' />
                </div>
              </div>
              <hr />
              <div className='flex justify-between items-center'>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">WHATSAPP NUMBER</h3>
                  <p className="flex items-center gap-1">
                    <span>+916576879867</span>
                  </p>
                </div>
                <div className='cursor-pointer'>
                  <FaWhatsapp className='w-7 h-7 text-teal-500' />
                </div>
              </div>
              <hr />
              <div className='flex justify-between items-center'>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">EMAIL ADDRESS</h3>
                  <p className="flex items-center gap-1">
                    <span>example@abc.com</span>
                  </p>
                </div>
                <div className='cursor-pointer'>
                  <MdEmail className='w-7 h-7 text-teal-500' />
                </div>
              </div>
              <hr />
            </div>
            <div className='flex flex-col gap-4 flex-1'>
              <div>
                <h3 className="text-sm font-bold text-gray-900">GROUPS</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">0. Not Interested</span>
                  <span className="px-2 py-1 bg-blue-200 text-blue-700 rounded-full text-sm">1. Interested</span>
                  <span className="px-2 py-1 bg-orange-200 text-orange-700 rounded-full text-sm">2. Meeting Booked</span>
                  <span className="px-2 py-1 bg-purple-200 text-purple-700 rounded-full text-sm">3. Proposal</span>
                  <span className="px-2 py-1 bg-red-200 text-red-700 rounded-full text-sm">4. Negotiating</span>
                  <span className="px-2 py-1 bg-green-200 text-green-700 rounded-full text-sm">5. Purchased</span>
                </div>
              </div>
              <div onClick={openNotesModal} className='cursor-pointer hover:bg-gray-100'>
                <h3 className="text-sm font-bold text-gray-900">NOTES</h3>
                <p>{clientNotes ? clientNotes : "Click to add notes about your client..."}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <h2 className="text-xl font-bold mb-4">Timeline</h2>
          <div className='bg-white rounded-sm shadow-md p-6 flex-grow '>
            <NavLink className="flex justify-start items-center gap-3 mb-4 bg-white text-teal-500 -px-4 py-2 hover:text-teal-600 transition duration-300">
              <div className=''>
                <FaCirclePlus className='w-8 h-8' />
              </div>
              Add Activity
            </NavLink>
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                    <i className="fas fa-paper-plane text-blue-500"></i>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Jul 10, 2024 02:33 PM</p>
                    <button className="text-gray-400 hover:text-gray-600">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </div>
                  <p className="font-semibold">Example - ACME Residences Brochure</p>
                  <p className="text-sm text-gray-500">Unopened</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <i className="fas fa-clock text-gray-500"></i>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Jul 10, 2024 02:33 PM</p>
                  <p className="font-semibold">First response logged in 19 minutes</p>
                  <p className="text-sm text-gray-500">Sent Quick Response File</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <i className="fas fa-user-plus text-gray-500"></i>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Jul 10, 2024 02:13 PM</p>
                  <p className="font-semibold">Client added to Privyr</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ClientNotesModal
        isOpen={isNotesModalOpen}
        onClose={closeNotesModal}
        onSave={saveNotes}
        initialNotes={clientNotes}
      />

      <QuickResponseModal
        isOpen={isResponseModalOpen}
        onClose={closeResponseModal}
      />
    </div>
  );
};

export default ClientDetails;