import React, { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { FaGoogle } from "react-icons/fa";
import { API_BASE_URL } from "../../config";
import { setUser } from "../redux/reducers/userReducer";
import { getUser } from "../api";

const GoogleLoginButton = () => {
  
  const responseGoogle = async (authResult) => {
    try {
      console.log(authResult.code);
      const code = authResult.code;
      if(code) {
        const result = await googleAuth(code);
        console.log(result);
      }
    } catch (error) {
      console.log("Error while google logging: ", error)
    }
  }

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  })

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
