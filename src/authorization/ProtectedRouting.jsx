import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRouting = ({ children }) => {
    
  if (localStorage.getItem("role") != null) {
    return children;
  }  else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default ProtectedRouting

