import React, { useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import toast from "react-hot-toast";
import { PuffLoader } from "react-spinners";

import { deleteClient, fetchClient, updateClientInfo } from "../../api";
import { formatDateWithYear } from "../../utils";
import Loading from "../../components/Loading";
import NoDataWrapper from "../../components/NoDataWrapper";
import FollowUpSection from "../../components/FollowUpSection";
import ClientTimeline from "../../components/ClientTimeline";
import ClientModals from "../../components/ClientModals";
import { FaGreaterThan, FaTelegramPlane } from "react-icons/fa";
import { getGroupStyle } from "../../constants";

const ClientDetails = () => {
  const [clientInfo, setClientInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const [modalStates, setModalStates] = useState({
    notes: false,
    response: false,
    activity: false,
    edit: false,
    group: false,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const toggleOptions = () => setIsOptionsOpen(!isOptionsOpen);

  const fetchClientDetails = useCallback(async () => {
    try {
      const fetchedClient = await fetchClient(id);
      setClientInfo(fetchedClient);
    } catch (error) {
      console.error("Error fetching client details:", error);
      toast.error("Failed to load client details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchClientDetails();
  }, [fetchClientDetails]);

  useEffect(() => {
    if (clientInfo) {
      updateClientInfo(clientInfo);
    }
  }, [clientInfo]);

  const toggleModal = (modalName) => {
    setModalStates((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
  };

  const markClientUncontacted = () => {
    setClientInfo((prevState) => ({
      ...prevState,
      contacted: false,
    }));

    toast.success(`Client Marked Uncontacted`);
  };

  const handleUpdateClient = (updatedInfo) => {
    setClientInfo((prev) => ({ ...prev, ...updatedInfo }));
    toast.success("Client information updated");
  };

  const handleDeleteClient = async () => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await deleteClient(clientInfo._id);
        navigate("/clients");
        toast.success("Client deleted");
      } catch (error) {
        console.error("Error deleting client:", error);
        toast.error("Failed to delete client");
      }
    }
  };

  const addActivity = (activity) => {
    setClientInfo((prev) => ({
      ...prev,
      activity: [
        ...prev.activity,
        {
          category: activity.activityType,
          details: activity.activityDetails,
          dateAndTime: formatDateWithYear(activity.activityDate),
        },
      ],
    }));
    toast.success("Activity added");
  };

  if (loading) {
    return (
      <Loading>
        <PuffLoader color="#09e34f" speedMultiplier={3} />
      </Loading>
    );
  }

  if (!clientInfo) {
    return <NoDataWrapper>No Client with the ID: {id} found.</NoDataWrapper>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <nav className="text-sm flex items-center">
            <NavLink
              to="/clients"
              className="text-gray-600 hover:text-gray-700 underline font-bold"
            >
              Clients
            </NavLink>
            <span className="mx-2 text-gray-600">
              <FaGreaterThan className="w-[8px] h-[10px]" />
            </span>
            <span className="text-gray-600 font-bold">
              {clientInfo.clientName}
            </span>
          </nav>
          <div onClick={() => toggleModal("response")} className="space-x-2">
            <button className="flex items-center justify-center gap-2 bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition duration-300">
              <FaTelegramPlane />
              Send Quick Response
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center relative">
          <h1 className="text-3xl font-bold">{clientInfo.clientName}</h1>
          <button
            onClick={toggleOptions}
            className={`flex items-center justify-center gap-1 px-4 py-2 ${
              isOptionsOpen
                ? "text-white bg-teal-800"
                : "text-gray-600 hover:bg-gray-200"
            } font-semibold rounded-sm  transition duration-300`}
          >
            Options
            <BsThreeDotsVertical />
          </button>
          {isOptionsOpen && (
            <div className="absolute top-8 right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                <div
                  onClick={() => toggleModal("edit")}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Edit Contact Details
                </div>
                <div
                  onClick={() => {
                    toggleModal("notes");
                    toggleOptions();
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Edit Client Notes
                </div>
                <div
                  onClick={markClientUncontacted}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Mark as Uncontacted
                </div>
                <div
                  onClick={handleDeleteClient}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                >
                  Delete Client
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      {/* Follow Up section */}
      <FollowUpSection clientInfo={clientInfo} setClientInfo={setClientInfo} />

      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4 pl-2">Client Info</h2>
          <div className="w-full space-y-4 flex justify-around bg-white rounded-sm shadow-md p-6 flex-grow gap-4">
            <div className="flex flex-col gap-4 flex-1 px-4">
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  DISPLAY NAME
                </h3>
                <p className="mb-3">
                  {clientInfo.displayName
                    ? clientInfo.displayName
                    : clientInfo.clientName.split(" ")[0].toLowerCase()}
                </p>
                <hr />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    MOBILE NUMBER
                  </h3>
                  <p className="flex items-center gap-1">
                    <span>{clientInfo.phoneNumber}</span>
                  </p>
                </div>
                <div className="cursor-pointer">
                  <FaPhone className="w-7 h-7 text-teal-500" />
                </div>
              </div>
              <hr />
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    WHATSAPP NUMBER
                  </h3>
                  <p className="flex items-center gap-1">
                    <span>{clientInfo.whatsappNumber}</span>
                  </p>
                </div>
                <div className="cursor-pointer">
                  <FaWhatsapp className="w-7 h-7 text-teal-500" />
                </div>
              </div>
              <hr />
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    EMAIL ADDRESS
                  </h3>
                  <p className="flex items-center gap-1">
                    <span>{clientInfo.email}</span>
                  </p>
                </div>
                <div className="cursor-pointer">
                  <MdEmail className="w-7 h-7 text-teal-500" />
                </div>
              </div>
              <hr />
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <div
                onClick={() => toggleModal("group")}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                <h3 className="text-sm font-bold text-gray-900">GROUPS</h3>
                <div className="w-full flex flex-wrap gap-2 mt-2">
                  {clientInfo.groups.length > 0
                    ? clientInfo.groups.map((group, index) => (
                        <span
                          key={index}
                          className={`flex justify-center overflow-auto px-2 py-1 rounded-md text-sm mr-2 mb-2 ${getGroupStyle(
                            group
                          )}`}
                        >
                          {group}
                        </span>
                      ))
                    : "Click to add groups"}
                </div>
              </div>
              <div
                onClick={() => toggleModal("notes")}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                <h3 className="text-sm font-bold text-gray-900">NOTES</h3>
                <p>
                  {clientInfo.notes
                    ? clientInfo.notes
                    : "Click to add notes about your client..."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <ClientTimeline
          activities={clientInfo.activity}
          onAddActivity={() => toggleModal("activity")}
        />
      </div>

      <ClientModals
        modalStates={modalStates}
        toggleModal={toggleModal}
        clientInfo={clientInfo}
        onUpdateClient={handleUpdateClient}
        onAddActivity={addActivity}
      />
    </div>
  );
};

export default ClientDetails;

// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import {
//   FaTelegramPlane,
//   FaGreaterThan,
//   FaPhone,
//   FaWhatsapp,
// } from "react-icons/fa";
// import { FaCirclePlus } from "react-icons/fa6";
// import { MdEmail } from "react-icons/md";
// import ClientNotesModal from "../../components/ClientNotesModal";
// import QuickResponseModal from "../../components/QuickResponseModal";
// import AddActivityModal from "../../components/AddActivityModal";
// import { formatDateWithYear } from "../../utils";
// import GroupSelectionModal from "./GroupSelectionModal";
// import { getGroupStyle } from "../../constants";
// import { deleteClient, fetchClient, updateClientInfo } from "../../api";
// import FollowUpSection from "../../components/FollowUpSection";
// import AddEditClientModal from "../../components/AddEditClientModel";
// import NoDataWrapper from "../../components/NoDataWrapper";
// import toast from "react-hot-toast";
// import { PuffLoader } from "react-spinners";
// import Loading from "../../components/Loading";

// const ClientDetails = () => {
//   const [isOptionsOpen, setIsOptionsOpen] = useState(false);
//   const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
//   const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
//   const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
//   const [clientInfo, setClientInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const toggleOptions = () => {
//     setIsOptionsOpen(!isOptionsOpen);
//   };

//   const openNotesModal = () => {
//     setIsNotesModalOpen(true);
//   };

//   const closeNotesModal = () => {
//     setIsNotesModalOpen(false);
//   };

//   const openResponseModal = () => {
//     setIsResponseModalOpen(true);
//   };

//   const closeResponseModal = () => {
//     setIsResponseModalOpen(false);
//   };

//   const openAddActivityModal = () => {
//     setIsAddActivityModalOpen(true);
//   };

//   const closeAddActivityModal = () => {
//     setIsAddActivityModalOpen(false);
//   };

//   const toggleGroupModal = () => {
//     setIsGroupModalOpen(!isGroupModalOpen);
//   };

//   const openEditModal = () => {
//     setIsEditModalOpen(true);
//     setIsOptionsOpen(false);
//   };

//   const closeEditModal = () => {
//     setIsEditModalOpen(false);
//   };

//   const saveNotes = (notes) => {
//     setClientInfo((prevState) => ({
//       ...prevState,
//       notes: notes,
//     }));

//     toast.success(`Notes Updated`);
//   };

//   const handleUpdateGroups = (groups) => {
//     setClientInfo((prevState) => ({ ...prevState, groups }));
//     updateClientInfo({ ...clientInfo, groups });

//     toast.success(`Groups Updated`);
//   };

//   const markClientUncontacted = () => {
//     setClientInfo((prevState) => ({
//       ...prevState,
//       contacted: false,
//     }));

//     toast.success(`Client Marked Uncontacted`);
//   };

//   const handleDeleteClient = async () => {
//     if (window.confirm("Are you sure you want to delete this file?")) {
//       await deleteClient(clientInfo._id);

//       navigate(`/clients`);
//       toast.remove(`Client Deleted`);
//     }
//   };

//   const addActivity = (activity) => {
//     setClientInfo((prevState) => {
//       let updatedActivity = [
//         ...prevState.activity,
//         {
//           category: activity.activityType,
//           details: activity.activityDetails,
//           dateAndTime: `${formatDateWithYear(activity.activityDate)}`,
//         },
//       ];
//       return { ...prevState, activity: updatedActivity };
//     });

//     toast.success(`Added Activity`);
//   };

//   const fetchClientDetails = async (id) => {
//     const fetchedClient = await fetchClient(id);
//     setClientInfo(fetchedClient);

//     setLoading(false);
//   };

//   const handleEditClient = (updatedClientInfo) => {
//     setClientInfo(updatedClientInfo);
//     closeEditModal();

//     toast.success(`Updated Client Info`);
//   };

//   useEffect(() => {
//     updateClientInfo(clientInfo);
//   }, [clientInfo]);

//   useEffect(() => {
//     fetchClientDetails(id);
//   }, []);

//   return (
//     <div className="bg-gray-100 min-h-screen p-4">
//       {loading && (
//         <Loading>
//           <PuffLoader color="#09e34f" speedMultiplier={3} />
//         </Loading>
//       )}
//       {!loading && !clientInfo && (
//         <NoDataWrapper>No Client with the ID: {id} found.</NoDataWrapper>
//       )}
//       {!loading && clientInfo && (
//         <div>
//           <header className="mb-6">
//             <div className="flex justify-between items-center mb-4">
//               <nav className="text-sm flex items-center">
//                 <NavLink
//                   to="/clients"
//                   className="text-gray-600 hover:text-gray-700 underline font-bold"
//                 >
//                   Clients
//                 </NavLink>
//                 <span className="mx-2 text-gray-600">
//                   <FaGreaterThan className="w-[8px] h-[10px]" />
//                 </span>
//                 <span className="text-gray-600 font-bold">
//                   {clientInfo.clientName}
//                 </span>
//               </nav>
//               <div onClick={openResponseModal} className="space-x-2">
//                 <button className="flex items-center justify-center gap-2 bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition duration-300">
//                   <FaTelegramPlane />
//                   Send Quick Response
//                 </button>
//               </div>
//             </div>
//             <div className="flex justify-between items-center relative">
//               <h1 className="text-3xl font-bold">{clientInfo.clientName}</h1>
//               <button
//                 onClick={toggleOptions}
//                 className={`flex items-center justify-center gap-1 px-4 py-2 ${
//                   isOptionsOpen
//                     ? "text-white bg-teal-800"
//                     : "text-gray-600 hover:bg-gray-200"
//                 } font-semibold rounded-sm  transition duration-300`}
//               >
//                 Options
//                 <BsThreeDotsVertical />
//               </button>
//               {isOptionsOpen && (
//                 <div className="absolute top-8 right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
//                   <div className="py-1">
//                     <div
//                       onClick={openEditModal}
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//                     >
//                       Edit Contact Details
//                     </div>
//                     <div
//                       onClick={() => {
//                         openNotesModal();
//                         toggleOptions();
//                       }}
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//                     >
//                       Edit Client Notes
//                     </div>
//                     <div
//                       onClick={markClientUncontacted}
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//                     >
//                       Mark as Uncontacted
//                     </div>
//                     <div
//                       onClick={handleDeleteClient}
//                       className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
//                     >
//                       Delete Client
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </header>
//           {/* Follow Up section */}
//           <FollowUpSection
//             clientInfo={clientInfo}
//             setClientInfo={setClientInfo}
//           />

//           <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
//             <div className="w-full">
//               <h2 className="text-xl font-bold mb-4 pl-2">Client Info</h2>
//               <div className="w-full space-y-4 flex justify-around bg-white rounded-sm shadow-md p-6 flex-grow gap-4">
//                 <div className="flex flex-col gap-4 flex-1 px-4">
//                   <div>
//                     <h3 className="text-sm font-bold text-gray-900">
//                       DISPLAY NAME
//                     </h3>
//                     <p className="mb-3">
//                       {clientInfo.displayName
//                         ? clientInfo.displayName
//                         : clientInfo.clientName.split(" ")[0].toLowerCase()}
//                     </p>
//                     <hr />
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <h3 className="text-sm font-bold text-gray-900">
//                         MOBILE NUMBER
//                       </h3>
//                       <p className="flex items-center gap-1">
//                         <span>{clientInfo.phoneNumber}</span>
//                       </p>
//                     </div>
//                     <div className="cursor-pointer">
//                       <FaPhone className="w-7 h-7 text-teal-500" />
//                     </div>
//                   </div>
//                   <hr />
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <h3 className="text-sm font-bold text-gray-900">
//                         WHATSAPP NUMBER
//                       </h3>
//                       <p className="flex items-center gap-1">
//                         <span>{clientInfo.whatsappNumber}</span>
//                       </p>
//                     </div>
//                     <div className="cursor-pointer">
//                       <FaWhatsapp className="w-7 h-7 text-teal-500" />
//                     </div>
//                   </div>
//                   <hr />
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <h3 className="text-sm font-bold text-gray-900">
//                         EMAIL ADDRESS
//                       </h3>
//                       <p className="flex items-center gap-1">
//                         <span>{clientInfo.email}</span>
//                       </p>
//                     </div>
//                     <div className="cursor-pointer">
//                       <MdEmail className="w-7 h-7 text-teal-500" />
//                     </div>
//                   </div>
//                   <hr />
//                 </div>
//                 <div className="flex flex-col gap-4 flex-1">
//                   <div
//                     onClick={toggleGroupModal}
//                     className="p-2 cursor-pointer hover:bg-gray-100"
//                   >
//                     <h3 className="text-sm font-bold text-gray-900">GROUPS</h3>
//                     <div className="w-full flex flex-wrap gap-2 mt-2">
//                       {clientInfo.groups.length > 0
//                         ? clientInfo.groups.map((group, index) => (
//                             <span
//                               key={index}
//                               className={`flex justify-center overflow-auto px-2 py-1 rounded-md text-sm mr-2 mb-2 ${getGroupStyle(
//                                 group
//                               )}`}
//                             >
//                               {group}
//                             </span>
//                           ))
//                         : "Click to add groups"}
//                     </div>
//                   </div>
//                   <div
//                     onClick={openNotesModal}
//                     className="p-2 cursor-pointer hover:bg-gray-100"
//                   >
//                     <h3 className="text-sm font-bold text-gray-900">NOTES</h3>
//                     <p>
//                       {clientInfo.notes
//                         ? clientInfo.notes
//                         : "Click to add notes about your client..."}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="lg:w-1/2">
//               <h2 className="text-xl font-bold mb-4">Timeline</h2>
//               <div className="bg-white rounded-sm shadow-md p-6 flex-grow ">
//                 <div
//                   onClick={openAddActivityModal}
//                   className="flex justify-start items-center gap-3 mb-4 bg-white text-teal-500 -px-4 py-2 hover:text-teal-600 transition duration-300 cursor-pointer"
//                 >
//                   <div className="">
//                     <FaCirclePlus className="w-8 h-8" />
//                   </div>
//                   Add Activity
//                 </div>
//                 <div className="space-y-4">
//                   {clientInfo.activity.map((activityDetail, index) => (
//                     <div key={index} className="flex">
//                       <div className="flex-shrink-0 mt-1">
//                         <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
//                           <i className="fas fa-user-plus text-gray-500"></i>
//                         </div>
//                       </div>
//                       <div className="ml-4">
//                         <p className="text-sm text-gray-500">
//                           {activityDetail.dateAndTime}
//                         </p>
//                         <p className="font-semibold">
//                           {activityDetail.category}
//                         </p>
//                         <p className="text-gray-500">
//                           {activityDetail.details}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <ClientNotesModal
//         isOpen={isNotesModalOpen}
//         onClose={closeNotesModal}
//         onSave={saveNotes}
//         initialNotes={clientInfo?.notes}
//       />

//       <AddEditClientModal
//         isOpen={isEditModalOpen}
//         onClose={closeEditModal}
//         editClient={handleEditClient}
//         clientToEdit={clientInfo}
//       />

//       <QuickResponseModal
//         isOpen={isResponseModalOpen}
//         onClose={closeResponseModal}
//         clientInfo={clientInfo}
//       />

//       <AddActivityModal
//         isOpen={isAddActivityModalOpen}
//         onClose={closeAddActivityModal}
//         onAdd={addActivity}
//         clientName={clientInfo?.clientName}
//       />

//       <GroupSelectionModal
//         isOpen={isGroupModalOpen}
//         onClose={toggleGroupModal}
//         onSave={handleUpdateGroups}
//         selectedGroups={clientInfo?.groups || []}
//       />
//     </div>
//   );
// };

// export default ClientDetails;