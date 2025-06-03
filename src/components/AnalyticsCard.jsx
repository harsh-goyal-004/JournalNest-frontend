import React from "react";

function AnalyticsCard({ name, value, borderColor, imageColor, image }) {
  return (
    <div>
      <div
        className={`h-24 w-70 shadow-lg border-2 border-gray-200 ${borderColor} border-l-6 rounded-lg flex gap-3 items-center px-2`}
      >
        <div
          className={`h-14 w-14 flex justify-center items-center ${imageColor} rounded-full`}
        >
          <img src={image} alt="Journal" className="w-8" />
        </div>
        <div className="flex flex-col justify-center items-start ">
          <p className="font-medium text-2xl">{value}</p>
          <span className="text-[16px] font-medium text-gray-500">{name}</span>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCard;
