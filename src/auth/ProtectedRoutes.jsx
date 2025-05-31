import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const { auth } = useContext(AuthContext);

  if (auth === null) {
    return <div>Loading....</div>;
  }

  return <>{auth ? <Outlet /> : <Navigate to="/login" />}</>;
}

export default ProtectedRoutes;
