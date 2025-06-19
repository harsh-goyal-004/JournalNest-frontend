import React, { useEffect, useState } from "react";
import {
  getStarredEntries,
  toggleStarredEntries,
} from "../service/authService";

function Starred({ setView }) {
  const [starredEntries, setStarredEntries] = useState([]);
  const [toggleStarred, setToggleStarred] = useState(true);

  useEffect(() => {
    async function getAllStarredEntries() {
      try {
        const res = await getStarredEntries();
        setStarredEntries(res.data);
        // console.log(starredEntries);
      } catch (error) {
        console.log("Error while fetching Starred Entries:", error);
      }
    }
    getAllStarredEntries();
  }, [toggleStarred]);

  // This function removes the html from journal content
  function stripHtml(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  }

  async function handleStarredEntries(id) {
    const res = await toggleStarredEntries(id);
  }

  return (
    <>
      {starredEntries.length !== 0 ? (
        <>
          <div className="shadow-lg py-3 mb-5">
            <h1 className="text-2xl font-medium text-center uppercase ">
              Starred Entries
            </h1>
          </div>
          <div className="flex gap-4 p-6 justify-center md:justify-start flex-wrap">
            {starredEntries.map((entry, key) => (
              <div
                className="h-60 relative w-58 border-2 border-gray-100 shadow-lg rounded-lg flex flex-col cursor-pointer "
                key={key}
                onClick={() => setView({ type: "Entry", data: entry })}
              >
                <div className="pb-1 border-b-2 border-gray-400 mx-2">
                  <h1 className=" text-lg font-bold mt-2">{entry?.title}</h1>

                  <p className="text-gray-400 text-[10px] font-medium ">
                    {new Date(entry?.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                {/* Content */}
                <div>
                  <p className="px-3 py-2">
                    {stripHtml(entry?.content).slice(0, 120) + "..."}
                  </p>
                </div>
                {/* Starred button */}
                <div className="w-full absolute bottom-0 left-45">
                  <button
                    onClick={async (e) => {
                      e.stopPropagation(); // To stop event bubbling
                      await handleStarredEntries(entry.id);
                      setToggleStarred((prev) => !prev);
                    }}
                  >
                    <img src="/star.svg" alt="Starred" className="w-8" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="shadow-lg py-3 mb-5">
            <h1 className="text-2xl font-medium text-center uppercase ">
              Starred Entries
            </h1>
          </div>
          <div className="h-full flex justify-center items-center">
            <h1 className="text-2xl font-medium">No Starred Journal Entries</h1>
          </div>
        </>
      )}
    </>
  );
}

export default Starred;
