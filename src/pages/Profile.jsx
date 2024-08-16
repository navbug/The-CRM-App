import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

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
  const [profileData, setProfileData] = useState({
    name: "",
    phoneNumber: "",
    whatsAppNumber: "",
    emailAddress: "",
    companyName: "",
    country: "",
  });

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
    // Add logic to save profile data
    console.log("Profile data saved:", profileData);
  };

  const handlePhotoUpload = (file) => {
    // Add logic to handle photo upload
    console.log("Photo uploaded:", file);
    setIsEditingPhoto(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

      {/* Profile photo section */}
      <div className="mb-4 flex items-center flex-col">
        <h2 className="text-lg font-semibold mb-2">Profile Photo</h2>
        <div className="relative inline-block">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-3xl">
            {<FaUser />}
          </div>
          <button
            className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow"
            onClick={() => setIsEditingPhoto(true)}
          >
            Edit
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
            value={profileData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
            value={profileData.phoneNumber}
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
            name="whatsAppNumber"
            value={profileData.whatsAppNumber}
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
            value={profileData.emailAddress}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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

      <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded mt-4">
        SAVE
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
