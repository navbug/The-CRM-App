import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from "../redux/reducers/userReducer";
import { getUser } from "../api";

const AuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      
      getUser().then(userData => {
        if (userData) {
          localStorage.setItem("user", JSON.stringify(userData));
          dispatch(setUser(userData));
          navigate("/clients");
        }
      }).catch(error => {
        console.error("Failed to fetch user after Google login", error);
        navigate("/login");
      });
    } else {
      navigate("/login");
    }
  }, [navigate, dispatch]);

  return <div>Processing authentication...</div>;
};

export default AuthCallback;