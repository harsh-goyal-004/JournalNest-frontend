import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {
  injectUpdateAccessToken,
  setAccessToken,
} from "../service/axiosInstance";

function RootLayout() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAuth({ accessToken: token });
      setAccessToken(token);
      injectUpdateAccessToken(setAuth);
    }
  }, []);

  return (
    <>
      <div>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <Outlet />
        </AuthContext.Provider>
      </div>
    </>
  );
}

export default RootLayout;
