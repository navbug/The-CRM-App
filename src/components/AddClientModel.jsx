import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addClient } from "../redux/reducers/clientReducer";
import { formatDateAdded } from "../utils";
import { FaTimes } from "react-icons/fa";

const InputField = ({
  label,
  name,
  type,
  placeholder,
  required,
  value,
  onChange,
}) => (
  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={name}
    >
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

const CountryCodeSelect = ({ value, onChange, name }) => (
  <select
    className="absolute left-0 top-0 bottom-0 px-2 bg-gray-100 border-r"
    value={value}
    onChange={(e) => onChange(name, e.target.value)}
  >
    <option value="+91">🇮🇳 +91</option>
    {/* Add more country options here */}
  </select>
);

const PhoneInputField = ({
  label,
  name,
  required,
  countryCodeName,
  value,
  countryCodeValue,
  onInputChange,
  onCountryCodeChange,
}) => (
  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={name}
    >
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <CountryCodeSelect
        value={countryCodeValue}
        onChange={onCountryCodeChange}
        name={countryCodeName}
      />
      <input
        className="shadow appearance-none border rounded w-full py-2 pl-28 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        name={name}
        type="tel"
        placeholder="6453567890"
        value={value}
        onChange={onInputChange}
      />
    </div>
  </div>
);

const AddClientModal = ({ isOpen, onClose, addClient }) => {
  const [clientDetails, setClientDetails] = useState({
    clientName: "",
    displayName: "",
    phoneNumber: "",
    whatsappNumber: "",
    email: "",
    mobileCountryCode: "+91",
    whatsappCountryCode: "+91",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCountryCodeChange = (field, value) => {
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newClientDetails = {
      ...clientDetails,
      id: Date.now(),
      dateAdded: formatDateAdded(new Date()),
      lastActivity: "",
      notes: "",
      groups: [],
      activity: [],
      contacted: false,
    };

    addClient(newClientDetails);

    // dispatch(addClient(newClientDetails));
    console.log(newClientDetails);
    setClientDetails({
      clientName: "",
      displayName: "",
      phoneNumber: "",
      whatsappNumber: "",
      email: "",
      mobileCountryCode: "+91",
      whatsappCountryCode: "+91",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-xl font-semibold text-gray-900">
            Add New Client
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <FaTimes className="w-6 h-6"/>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Client Name"
            name="clientName"
            type="text"
            placeholder="e.g. Rohan Singh"
            required
            value={clientDetails.clientName}
            onChange={handleInputChange}
          />
          <InputField
            label="Display Name"
            name="displayName"
            type="text"
            placeholder="e.g. Rohan"
            value={clientDetails.displayName}
            onChange={handleInputChange}
          />
          <p className="text-sm text-gray-600 mb-4">
            Display name is what your clients will see.
          </p>
          <PhoneInputField
            label="Mobile Number"
            name="phoneNumber"
            required
            countryCodeName="mobileCountryCode"
            value={clientDetails.phoneNumber}
            countryCodeValue={clientDetails.mobileCountryCode}
            onInputChange={handleInputChange}
            onCountryCodeChange={handleCountryCodeChange}
          />
          <PhoneInputField
            label="WhatsApp Number"
            name="whatsappNumber"
            required
            countryCodeName="whatsappCountryCode"
            value={clientDetails.whatsappNumber}
            countryCodeValue={clientDetails.whatsappCountryCode}
            onInputChange={handleInputChange}
            onCountryCodeChange={handleCountryCodeChange}
          />
          <InputField
            label="Email Address"
            name="email"
            type="email"
            required
            placeholder="e.g. rohan@singh.com"
            value={clientDetails.email}
            onChange={handleInputChange}
          />
          <div className="mt-6">
            <button
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;
