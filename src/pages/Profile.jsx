import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { API_BARE_BASE_URL, API_BASE_URL } from "../../config";
import { setUser } from "../redux/reducers/userReducer";
import { fetchUser, updateUser, uploadAvatar } from "../api";

const PhotoUploadModal = ({ onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = useCallback((e) => {
    setSelectedFile(e.target.files[0]);
  }, []);

  const handleUpload = useCallback(() => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  }, [selectedFile, onUpload]);

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

const InputField = React.memo(
  ({ label, name, type = "text", value, onChange, readOnly }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        readOnly={readOnly}
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full border border-gray-300 ${
          readOnly && "bg-gray-200 cursor-not-allowed"
        } rounded-md shadow-sm p-2`}
        required
      />
    </div>
  )
);

const SelectField = React.memo(({ label, name, value, onChange, options }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      required
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
));

const SubmitButton = React.memo(({ loading }) => (
  <button
    type="submit"
    disabled={loading}
    className={`w-20 bg-teal-500 ${
      loading && "bg-opacity-80 cursor-not-allowed"
    } text-white px-4 py-2 rounded mt-4 font-semibold`}
  >
    {loading ? <ClipLoader color="white" size={20} /> : `SAVE`}
  </button>
));

const ProfilePhoto = React.memo(({ avatar, name, onEditClick }) => (
  <div className="mb-4 flex items-center flex-col">
    <h2 className="text-lg font-semibold mb-2">Profile Photo</h2>
    <div className="relative inline-block">
      <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-3xl overflow-hidden">
        {avatar ? (
          <img
            src={`${API_BARE_BASE_URL}${avatar}`}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-14 h-14 text-4xl font-bold text-gray-800 flex justify-center items-center">
            {name[0]}
          </div>
        )}
      </div>
      <button
        className="absolute bottom-0 right-0 bg-white p-1 rounded-md shadow-md"
        onClick={onEditClick}
      >
        <FaEdit />
      </button>
    </div>
  </div>
));

const ProfileForm = React.memo(
  ({ profileData, handleInputChange, handleSubmit, loading }) => (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Name"
        name="name"
        value={profileData.name}
        onChange={handleInputChange}
        readOnly={profileData.googleId}
      />
      <InputField
        label="Phone number"
        name="phoneNumber"
        type="number"
        value={profileData.phoneNumber}
        onChange={handleInputChange}
      />
      <InputField
        label="WhatsApp number"
        name="whatsappNumber"
        type="number"
        value={profileData.whatsappNumber}
        onChange={handleInputChange}
      />
      <InputField
        label="Email Address"
        name="email"
        type="email"
        value={profileData.email}
        onChange={handleInputChange}
        readOnly={profileData.googleId}
      />
      <SelectField
        label="Country"
        name="country"
        value={profileData.country}
        onChange={handleInputChange}
        options={[
          { value: "India", label: "India" },
          { value: "Japan", label: "Japan" },
        ]}
      />
      <SubmitButton loading={loading} />
    </form>
  )
);

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
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const dispatch = useDispatch();

  const fetchUserInfo = useCallback(
    async (id) => {
      const fetchedUserInfo = await fetchUser(id);
      setProfileData(fetchedUserInfo);
      dispatch(setUser(fetchedUserInfo));
    },
    [dispatch]
  );

  const handleSaveUser = useCallback(
    async (id, updatedUser) => {
      setLoading(true);
      try {
        const updatedUserInfo = await updateUser(id, updatedUser);
        if (updatedUserInfo) {
          await fetchUserInfo(id);
          toast.success(`User Info Updated`);
        }
      } catch (error) {
        toast.error(`Failed to update user info: ${error.message}`);
      } finally {
        setLoading(false);
      }
    },
    [fetchUserInfo]
  );

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("user"))._id;
    fetchUserInfo(id);
  }, [fetchUserInfo]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      handleSaveUser(profileData._id, profileData);
    },
    [profileData, handleSaveUser]
  );

  const handlePhotoUpload = useCallback(
    async (file) => {
      const formData = new FormData();
      formData.append("avatar", file);

      try {
        const response = await uploadAvatar(profileData._id, formData);

        if (response.status === 200) {
          fetchUserInfo(profileData._id);
          toast.success("Profile photo updated successfully");
        }
      } catch (err) {
        console.error("Error uploading photo:", err);
        toast.error("Failed to update profile photo");
      } finally {
        setIsEditingPhoto(false);
      }
    },
    [profileData._id, fetchUserInfo]
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

      <ProfilePhoto
        avatar={profileData.avatar}
        name={profileData.name}
        onEditClick={() => setIsEditingPhoto(true)}
      />

      <ProfileForm
        profileData={profileData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />

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
