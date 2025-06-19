import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function ProtectedRoutes() {
  const { auth } = useContext(AuthContext);

  if (auth === null) {
    return <LoadingSpinner />;
  }

  return <>{auth ? <Outlet /> : <Navigate to="/login" />}</>;
}

export default ProtectedRoutes;
