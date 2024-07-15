import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const {userInfo} = useSelector(state => state.user);
  console.log(userInfo);

  if(!userInfo) {
    return <Navigate to="/login" />
  } 
  return children;
}

export default ProtectedRoute;