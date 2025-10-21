import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRouting = ({ children }) => {
  const user = useSelector((state) => state.user);
  const isLoggedIn = user?.data?.data?.role ? true : false;
  
  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default ProtectedRouting

