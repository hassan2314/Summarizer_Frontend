import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user, status } = useSelector((state) => state.user);

  if (status && user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
