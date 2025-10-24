import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import { API_BASE_URL } from "../../config";
import { setUser } from "../redux/reducers/userReducer";
import { getUser, googleAuth } from "../api";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const responseGoogle = async (authResult) => {
    try {
      console.log(authResult.code);
      if(authResult["code"]) {
        const result = await googleAuth(authResult.code);
        const user = result.data;
        const token = result.data.token;
        console.log(result);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(setUser(user));
        navigate(`/clients`);
        toast.success("User Signed In 👤");
      }
    } catch (error) {
      console.log("Error while google login: ", error)
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
