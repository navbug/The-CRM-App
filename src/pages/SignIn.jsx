import React, { useState } from "react";
import Logo from "../assets/icons/privyr_logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/userReducer";
import { login } from "../api";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    let userData = {
      email: email,
      password: password,
    };

    try {
      setLoading(true);
      const data = await login(userData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(setUser(data));

      navigate(`/clients`);
      toast.success("User Signed In 👤");
    } catch (error) {
      console.error('Login failed', error.response?.data?.message || error.message);
      setPassword("");
      toast.error(`Login failed, please try again`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <img src={Logo} alt="logo" className="h-8 mb-4" />
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 m">
        <h2 className="text-2xl font-bold text-center mb-4">
          Sign In to Privyr
        </h2>

        <GoogleLoginButton />
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
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 ${loading && "bg-opacity-80 cursor-not-allowed"} bg-teal-600 font-semibold text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-300`}
          >
            {loading ? <ClipLoader color="white" size={20}/> : `NEXT →`}
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