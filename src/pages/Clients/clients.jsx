import React, { useCallback, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { clientTabs } from "../../constants";
import AddEditClientModal from "../../components/AddEditClientModel";
import { FaPlus } from "react-icons/fa";
import { addClient, fetchClients, getUser } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setInitialClients } from "../../redux/reducers/clientReducer";
import toast from "react-hot-toast";

const Clients = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clientsInformation = useSelector(state => state.client.clientsInfo);
  const dispatch = useDispatch();

  console.log(clientsInformation);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const handleAddClient = useCallback(async (clientInfo) => {
    try {
      await addClient(clientInfo);
      const fetchedClients = await fetchClients();
      dispatch(setInitialClients(fetchedClients));
      toast.success(`Added New Client 🔗`);
    } catch (error) {
      console.error("Error adding client:", error);
      toast.error("Failed to add client. Please try again.");
    }
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Clients</h1>
        <button
          onClick={openModal}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center gap-1"
        >
          <FaPlus /> ADD NEW CLIENT
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex border-b">
          {clientTabs.map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.path}
              end={tab.path === "/clients"}
              className={({ isActive }) =>
                `py-4 px-6 font-medium ${
                  isActive
                    ? "border-b-2 border-teal-500 text-teal-500"
                    : "text-gray-500 hover:text-gray-700"
                }`
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>

      <AddEditClientModal
        isOpen={isModalOpen}
        onClose={closeModal}
        addClient={handleAddClient}
      />
    </div>
  );
};

export default Clients;
