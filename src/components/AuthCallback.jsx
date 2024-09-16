import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/userReducer";
import { getUser } from "../api";

const AuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserData = async () => {
    try {
      const userData = await getUser();
      if (userData && userData.token) {
        console.log(userData);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData));
        dispatch(setUser(userData));
        navigate("/clients");
      } else {
        throw new Error("User data or token not found");
      }
    } catch (error) {
      console.error("Failed to fetch user after Google login", error);
      setError("Authentication failed. Please try again.");
      setTimeout(() => navigate("/login"), 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return <div>Processing authentication...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return null;
};

export default AuthCallback;