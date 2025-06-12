import React, { useEffect, useState } from "react";
import { getAllEntries } from "../service/authService";

const sidebar = [
  {
    image: "/star.svg",
    name: "Starred",
  },
  {
    image: "/add.svg",
    name: "New Entry",
  },
  {
    image: "/stats.svg",
    name: "Analytics",
  },
  {
    image: "/settings.svg",
    name: "Settings",
  },
];

function Sidebar({ setView, allEntries }) {
  return (
    <>
      <div className="h-full overflow-y-auto border-b-1 border-gray-400">
        {/* Sidebar Items */}
        <div>
          <ul className="w-full h-full ">
            {sidebar.map((item, index) => (
              <li
                className="flex gap-2 font-medium p-2 pb-3 text-sm hover:cursor-pointer hover:bg-gray-300"
                key={index}
                onClick={() => setView({ type: item.name, data: null })}
              >
                <img src={item.image} alt={item.name} className="w-5" />
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        {/* All Journal Entries */}
        <div className="mt-2 px-2 text-md text-gray-600 font-medium">
          <h1> All Journal Entries</h1>
          <ul className="text-black font-normal">
            {allEntries.map((entry) => (
              <li
                key={entry.id}
                className="px-2 py-2 font-medium text-sm flex gap-2 hover:cursor-pointer hover:bg-gray-300"
                onClick={() => setView({ type: "Entry", data: entry })}
              >
                <img src="/journal.svg" alt="journal" className="w-5" />
                {entry.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
