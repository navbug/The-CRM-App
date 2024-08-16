import React, { useState } from "react";
import axios from "axios";
import Logo from "../assets/icons/privyr_logo.svg";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/userReducer";
import { API_BASE_URL } from "../../config";
import { useGoogleLogin } from "@react-oauth/google";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    const userData = {
      name: username,
      email,
      password,
    };

    try {
      const result = await axios.post(
        `${API_BASE_URL}/register`,
        userData
      );

      if (result.status === 201) {
        console.log("register successful", result.data);
      }
      // setName("");
      // setEmail("");
      // setPassword("");

      navigate("/login");
    } catch (error) {
      console.log("registration failed", error);
    }
  };

  const googleLogin = () => {
    window.location.href = `http://localhost:4000/auth/google`;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <img src={Logo} alt="Privyr" className="h-8 mb-4" />
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 m">
        <h2 className="text-2xl font-bold text-center mb-4">
          Register to Privyr
        </h2>

        <button
          onClick={googleLogin}
          className="w-full bg-blue-600 font-semibold text-white py-2 px-4 rounded-md my-6 flex items-center justify-center hover:bg-opacity-90 transition duration-300"
        >
          Register with Google
          <FaGoogle className="h-6 w-6 text-white ml-2" />
        </button>
        <div className="flex items-center my-4 font-semibold">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <form onSubmit={registerUser}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privyr-teal"
              placeholder="e.g. rohan"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privyr-teal"
              placeholder="e.g. email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privyr-teal"
              placeholder="should be min 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 font-semibold text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-300"
          >
            NEXT →
          </button>
        </form>
        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-800 font-semibold">
            LOGIN
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
