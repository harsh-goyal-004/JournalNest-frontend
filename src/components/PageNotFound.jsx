import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-800 px-4">
      <img
        src="/sad.svg" // replace with your own image path
        alt="404 Not Found"
        className="w-64 h-64 mb-6 animate-bounce"
      />
      <h1 className="text-5xl font-bold mb-2">404</h1>
      <p className="text-xl mb-6 text-center">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200"
      >
        Go Back Home
      </button>
    </div>
  );
}

export default PageNotFound;
