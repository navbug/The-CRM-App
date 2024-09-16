import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/userReducer";
import { getUser } from "../api";

const AuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserData = async () => {
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
      navigate("/login");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return <div>Processing authentication...</div>;
};

export default AuthCallback;