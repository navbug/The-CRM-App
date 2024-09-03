import React, { useEffect } from "react";
import { API_BASE_URL } from "../../config";
import { setUser } from "../redux/reducers/userReducer";
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { getUser } from "../api";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    const googleLoginWindow = window.open(
      `${API_BASE_URL}/auth/google`,
      "_blank",
      "width=500,height=600"
    );

    const checkAuth = setInterval(async () => {
      if (googleLoginWindow.closed) {
        clearInterval(checkAuth);
        try {
          const userData = await getUser();
          if (userData) {
            console.log(userData);
            localStorage.setItem("token", userData.token);
            localStorage.setItem("user", JSON.stringify(userData));
            dispatch(setUser(userData));
            navigate("/clients");
          }
        } catch (error) {
          console.error("Failed to fetch user after Google login", error);
        }
      }
    }, 500);
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-blue-600 font-semibold text-white py-2 px-4 rounded-md my-6 flex items-center justify-center hover:bg-opacity-90 transition duration-300"
    >
      Sign In with Google
      <FaGoogle className="h-6 w-6 text-white ml-2" />
    </button>
  );
};

export default GoogleLoginButton;
