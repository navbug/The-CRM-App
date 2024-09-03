import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { setUser } from '../redux/reducers/userReducer';

const ProtectedRoute = ({children}) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      dispatch(setUser(user));
    }
  }, []);

  if(user) {
    return <Navigate to="/clients" />
  } 
  return children;
}

export default ProtectedRoute;