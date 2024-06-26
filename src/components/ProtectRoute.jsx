import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const ProtectRoute = ({
  isAuthenticated,
  children,
  adminOnly,
  Admin,
  redirect = "/",
}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirect} />;
  }
  if (adminOnly && !Admin) {
    return <Navigate to={redirect} />;
  }
  return children ? children : <Outlet />;
};

export default ProtectRoute;
