import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="relative w-32 h-32">
        {/* Rotating Spinner */}
        <div className="absolute inset-0 rounded-full border-8 border-t-transparent border-blue-500 animate-spin"></div>

        {/* Image in the center */}
        <img
          src="/journalnest-logo.png"
          alt="Logo"
          className="w-16 h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}

export default LoadingSpinner;
