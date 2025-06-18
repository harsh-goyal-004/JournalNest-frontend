import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {
  injectUpdateAccessToken,
  setAccessToken,
} from "../service/axiosInstance";
import Header from "../components/Header";

function RootLayout() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAuth({ accessToken: token });
      setAccessToken(token);
      injectUpdateAccessToken(setAuth);
    } else {
      setAuth(false);
    }
  }, []);

  return (
    <>
      <div>
        <AuthContext.Provider value={{ auth, setAuth }}>
          {auth === false ? <Header auth={auth} /> : null}
          <Outlet />
        </AuthContext.Provider>
      </div>
    </>
  );
}

export default RootLayout;
