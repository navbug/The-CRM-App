import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaGreaterThan, FaTelegramPlane, FaEye } from 'react-icons/fa'
import { FaCirclePlus } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom'

const FileDetails = () => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <nav className="text-sm flex items-center">
            <NavLink to="/content/files" className="text-gray-600 hover:text-gray-700 underline font-bold">Content</NavLink>
            <span className="mx-2 text-gray-600">
              <FaGreaterThan className='w-[8px] h-[10px]' />
            </span>
            <NavLink to="/content/files" className="text-gray-600 hover:text-gray-700 underline font-bold">Files</NavLink>
            <span className="mx-2 text-gray-600">
              <FaGreaterThan className='w-[8px] h-[10px]' />
            </span>
            <span className="text-gray-600 font-bold">File Name</span>
          </nav>
        </div>
        <div className="flex justify-between items-center relative">
          <h1 className="text-3xl font-bold">File Name</h1>
          <button onClick={toggleOptions} className={`flex items-center justify-center gap-1 px-4 py-2 ${isOptionsOpen ? "text-white bg-teal-800" : "text-gray-600 hover:bg-gray-200"} font-semibold rounded-sm  transition duration-300`}>
            Options
            <BsThreeDotsVertical />
          </button>
          {isOptionsOpen && (
            <div className="absolute top-8 right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit Default Message</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit File</a>
                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete File</a>
              </div>
            </div>
          )}
        </div>
        <div className='flex gap-4'>
          <span className='font-bold'>PDF</span>
          <span className='font-bold'>2 pages</span>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4 pl-2">Preview</h2>
          <div className="w-full min-h-64 space-y-4 flex flex-col bg-white rounded-sm shadow-md p-4 flex-grow gap-4">
            <div className='h-84 flex flex-col justify-center items-center gap-2'>
              <img className='w-full' src='https://via.placeholder.com/800x600' alt='File Preview' />
              <div className='flex items-center text-lg gap-2 text-teal-500 font-semibold'><FaEye /> Preview File</div>
            </div>
            <div className='hover:bg-gray-100 p-2'>
              <h3 className='font-semibold'>DEFAULT SHARE MESSAGE</h3>
              <br />
              Hi @clientName,
              <br /><br />
              Here's the link to view File name:

            </div>
          </div>

          <div className='text-gray-600 px-2 py-4 font-semibold'>File last updated 15 Jul 2024. Created 15 Jul 2024.</div>
        </div>

        <div className="w-full">
          <h2 className="text-xl font-bold mb-4">Sharing History</h2>
          <div className='bg-white rounded-sm shadow-md px-6 py-3 flex-grow mb-4 flex justify-between font-semibold'>
            <span>Total Sent</span>
            <span>2</span>
          </div>

          <h2 className="text-xl font-bold mb-4">Timeline</h2>
          <div className='bg-white rounded-sm shadow-md p-6 flex-grow '>
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                    <i className="fas fa-paper-plane text-blue-500"></i>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-500">Jul 10, 2024 02:33 PM</p>
                    <button className="text-gray-400 hover:text-gray-600">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </div>
                  <p className="font-semibold">Sent to Rohan Singh</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <i className="fas fa-clock text-gray-500"></i>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-semibold text-gray-500">Jul 10, 2024 02:33 PM</p>
                  <p className="font-semibold">File Uploaded</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <ClientNotesModal
                isOpen={isNotesModalOpen}
                onClose={closeNotesModal}
                onSave={saveNotes}
                initialNotes={clientNotes}
            /> */}
    </div>
  )
}

export default FileDetails;