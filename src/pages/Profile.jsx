import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { API_BARE_BASE_URL, API_BASE_URL } from "../../config";
import { setUser } from "../redux/reducers/userReducer";
import { fetchUser, updateUser } from "../api";

const PhotoUploadModal = ({ onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Change Profile Photo</h2>
        <div className="mb-4">
          <input type="file" onChange={handleFileSelect} accept="image/*" />
        </div>
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    phoneNumber: "",
    whatsappNumber: "",
    email: "",
    country: "",
    avatar: "",
  });
  const dispatch = useDispatch();

  const fetchUserInfo = async (id) => {
    let fetchedUserInfo = await fetchUser(id);
    setProfileData(fetchedUserInfo);
    dispatch(setUser(fetchedUserInfo));
  };

  const handleSaveUser = async (id, updatedUser) => {
    setLoading(true);
    let updatedUserInfo = await updateUser(id, updatedUser);
    updatedUserInfo && fetchUserInfo(id);
    setLoading(false);

    toast.success(`User Info Updated`);
  };

  useEffect(() => {
    let id = JSON.parse(localStorage.getItem("user"))._id;
    fetchUserInfo(id);
  }, []);

  const [isEditingPhoto, setIsEditingPhoto] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveUser(profileData._id, profileData);
  };

  const handlePhotoUpload = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/${profileData._id}/upload-avatar`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        fetchUserInfo(profileData._id);
      }
    } catch (err) {
      console.log("Error uploading photo:", err);
    }

    setIsEditingPhoto(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

      {/* Profile photo section */}
      <div className="mb-4 flex items-center flex-col">
        <h2 className="text-lg font-semibold mb-2">Profile Photo</h2>
        <div className="relative inline-block">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-3xl overflow-hidden">
            {profileData?.avatar ? (
              <img
                src={`${API_BARE_BASE_URL}${profileData.avatar}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-14 h-14 text-4xl font-bold text-gray-800 flex justify-center items-center">
                {profileData?.name[0]}
              </div>
            )}
          </div>
          <button
            className="absolute bottom-0 right-0 bg-white p-1 rounded-md shadow-md"
            onClick={() => setIsEditingPhoto(true)}
          >
            <FaEdit />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            readOnly={profileData?.googleId}
            value={profileData?.name}
            onChange={handleInputChange}
            className={`mt-1 block w-full border border-gray-300 ${
              profileData.googleId && "bg-gray-200 cursor-not-allowed"
            } rounded-md shadow-sm p-2`}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone number
          </label>
          <input
            type="number"
            name="phoneNumber"
            value={profileData?.phoneNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            WhatsApp number
          </label>
          <input
            type="number"
            name="whatsappNumber"
            value={profileData?.whatsappNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="emailAddress"
            readOnly={profileData.googleId}
            value={profileData?.email}
            onChange={handleInputChange}
            className={`mt-1 block w-full border border-gray-300 ${
              profileData.googleId && "bg-gray-200 cursor-not-allowed"
            } rounded-md shadow-sm p-2`}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            name="country"
            value={profileData.country}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          >
            <option value="India">India</option>
            <option value="Japan">Japan</option>
          </select>
        </div>
      </form>

      <button
        onClick={handleSubmit}
        type="submit"
        disabled={loading}
        className={`w-20 bg-teal-500 ${loading && "bg-opacity-80 cursor-not-allowed"} text-white px-4 py-2 rounded mt-4 font-semibold`}
      >
        {loading ? <ClipLoader color="white" size={20}/> : `SAVE`}
      </button>

      {isEditingPhoto && (
        <PhotoUploadModal
          onClose={() => setIsEditingPhoto(false)}
          onUpload={handlePhotoUpload}
        />
      )}
    </div>
  );
};

export default Profile;
