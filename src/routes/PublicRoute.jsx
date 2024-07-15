import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PublicRoute = () => {
  const {userInfo} = useSelector(state => state.user);
  console.log(userInfo);

  if(userInfo) {
    return <Navigate to="/clients" />
  } else {
    return <Navigate to="/login" />
  }
}

export default PublicRoute;