import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const { auth } = useContext(AuthContext);
  return <>{auth ? <Outlet /> : <Navigate to="/login" />}</>;
}

export default ProtectedRoutes;
