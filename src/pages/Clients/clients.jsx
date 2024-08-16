import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { clientTabs } from "../../constants";
import AddClientModal from "../../components/AddClientModel";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from "../../../config";

const Clients = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/users/current_user", {
          withCredentials: true,
        });
        console.log(res);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await axios.get("http://localhost:4000/api/users/logout", {
      withCredentials: true,
    });
    setUser(null);
  };

  const handleAddClient = async (clientInfo) => {
    console.log(clientInfo);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/clients/new`,
        clientInfo,
        { headers: { "Content-Type": "application/json" } }
      );
      if(response.status === 201) {
        console.log("CLIENT ADDED");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, []);

  console.log(user);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* {!user ? (<div>Loading...</div>) : (<div>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>)} */}
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

      <AddClientModal
        isOpen={isModalOpen}
        onClose={closeModal}
        addClient={handleAddClient}
      />
    </div>
  );
};

export default Clients;
