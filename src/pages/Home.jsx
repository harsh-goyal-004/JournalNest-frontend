import React, { useEffect } from "react";
import axiosInstance from "../service/axiosInstance";

function Home() {
  useEffect(() => {
    async function getData() {
      const res = await axiosInstance.get("/api/journal/get-all-entries");
      console.log(res.data);
    }
    getData();
  });

  return (
    <>
      <div>Home</div>
    </>
  );
}

export default Home;
