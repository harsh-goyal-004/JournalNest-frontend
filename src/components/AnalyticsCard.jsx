import React from "react";

function AnalyticsCard({ name, value, borderColor, imageColor, image }) {
  return (
    <div>
      <div
        className={`h-20 w-60 shadow-lg border-2 border-gray-200 ${borderColor} border-l-6 rounded-lg flex gap-3 items-center px-2`}
      >
        <div
          className={`h-12 w-12 flex justify-center items-center ${imageColor} rounded-full`}
        >
          <img src={image} alt="Journal" className="w-8" />
        </div>
        <div className="flex flex-col justify-center items-start ">
          <p className="font-medium text-xl">{value}</p>
          <span className="text-[14px] font-medium text-gray-500">{name}</span>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCard;
