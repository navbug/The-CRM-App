import React, { useState } from "react";
import Logo from "../assets/icons/privyr_logo.svg";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/userReducer";
import axios from "axios";
import { API_BASE_URL } from "../../config";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    let userData = {
      email: email,
      password: password,
    };

    try {
      const result = await axios.post(`${API_BASE_URL}/login`, userData);
      
      if (result.status === 200) {
        localStorage.setItem("token", result.data.result.token);
        localStorage.setItem("user", JSON.stringify(result.data.result.user));

        dispatch(setUser(result.data.result.user));
        navigate("/clients");
      }
    } catch (error) {
      setEmail("");
      setPassword("");
      console.log("login error: " + error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <img src={Logo} alt="logo" className="h-8 mb-4" />
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 m">
        <h2 className="text-2xl font-bold text-center mb-4">
          Sign In to Privyr
        </h2>

        <button className="w-full bg-blue-600 font-semibold text-white py-2 px-4 rounded-md my-6 flex items-center justify-center hover:bg-opacity-90 transition duration-300">
          SignIn with Google
          <FaGoogle className="h-6 w-6 text-white ml-2" />
        </button>
        <div className="flex items-center my-4 font-semibold">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <form onSubmit={loginUser}>
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
          Don't have an account?{" "}
          <Link to="/register" className="text-teal-800 font-semibold">
            SIGN UP
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;