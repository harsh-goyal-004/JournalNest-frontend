import React from "react";

function Streak({ currentStreak, longestStreak }) {
  return (
    <>
      <div className="flex w-full items-center justify-center ">
        <div className="border-2 border-gray-300 shadow-xl p-4 w-2/4 rounded-2xl h-38 mx-24  flex items-center justify-around">
          <div className="flex justify-center items-center flex-col">
            <div className="h-20 w-20 rounded-full border-7 flex flex-col items-center justify-center mb-2 border-amber-500">
              <h1 className="text-3xl font-medium ">{currentStreak}</h1>
            </div>
            <h1 className="text-md text-amber-500 font-bold">Current Streak</h1>
          </div>

          <div className="h-full border border-gray-300"></div>

          <div className="flex justify-center items-center flex-col">
            <div className="h-20 w-20 rounded-full border-7 flex flex-col items-center justify-center mb-2 border-indigo-600">
              <h1 className="text-3xl font-medium">{longestStreak}</h1>
            </div>
            <h1 className="text-md  font-bold text-indigo-600">
              Longest Streak
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Streak;
