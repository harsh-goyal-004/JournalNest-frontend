import React, { useEffect, useState } from "react";
import { searchJournalEntry } from "../service/authService";

function Header({ auth }) {
  const [searchParams, setSearchParams] = useState({
    search: "",
    tag: [],
    mood: "",
  });
  const [openTagsPanel, setOpenTagsPanel] = useState(false);

  const journalTags = {
    WORK: "💼 Work",
    PERSONAL: "🧍Personal",
    HEALTH: "🏥 Health",
    STUDY: "📚 Study",
    TRAVEL: "✈️ Travel",
    IDEAS: "💡 Ideas",
    GOALS: "🎯 Goals",
    FAMILY: "👨‍👩‍👧‍👦 Family",
    MISC: "🗂️ Miscellaneous",
  };

  useEffect(() => {
    async function fetchFilterJournal() {
      if (
        searchParams.search !== "" ||
        searchParams.mood !== "" ||
        searchParams.tag.length > 0
      ) {
        const data = {
          search: searchParams.search,
          tag: searchParams.tag,
          mood: searchParams.mood,
        };

        try {
          const response = await searchJournalEntry(data);
          console.log(response.data);
        } catch (error) {
          console.log("Error while searching for entries : ", error);
        }
      }
    }
    fetchFilterJournal();
  }, [searchParams.mood, searchParams.tag]);

  // Fetch Journal By Title/Body
  async function handleSearchJounral(e) {
    e.preventDefault();

    if (searchParams.search !== "") {
      const data = {
        search: searchParams.search,
        tag: [],
        mood: "",
      };

      try {
        const response = await searchJournalEntry(data);
        console.log(response.data);
      } catch (error) {
        console.log("Error while searching for entries : ", error);
      }
    }
  }

  return (
    <>
      <div>
        <div className="h-14 w-full flex items-center gap-2 px-4 bg-white border-b-2 justify-between border-gray-300">
          <div className="flex items-center">
            <img
              src="/journalnest-logo.png"
              alt="JournalNest"
              className="w-10"
            />
            <h1 className="font-medium text-2xl">JournalNest</h1>
          </div>

          {auth ? (
            <div className="flex gap-5">
              <div className="flex relative">
                <img
                  src="/search.svg"
                  alt="Search"
                  className="absolute w-5 inset-0 top-2 left-2"
                />
                <form onSubmit={(e) => handleSearchJounral(e)}>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    value={searchParams.search}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        search: e.target.value,
                      })
                    }
                    placeholder="Quick Find"
                    className="px-2 pl-8 w-64 rounded-lg py-2 text-[14px] bg-gray-100"
                  />
                </form>
              </div>
              <div className="flex gap-4">
                <div className="relative w-full h-full">
                  <button
                    className="border px-3 rounded-sm bg-white text-black text-sm border-blue-500 h-full w-34"
                    onClick={() => setOpenTagsPanel(!openTagsPanel)}
                  >
                    Filter By Tags
                  </button>
                  <div
                    className={`absolute w-34 bg-white shadow-xl border border-gray-100 top-10 rounded-lg pl-2 flex flex-col gap-2 py-2 text-sm z-10 ${
                      openTagsPanel ? "block" : "hidden"
                    }`}
                  >
                    {Object.entries(journalTags).map(([key, value], index) => (
                      <div key={index}>
                        <input
                          type="checkbox"
                          id={key}
                          value={key}
                          onChange={(e) =>
                            setSearchParams((prev) => ({
                              ...prev,
                              tag: e.target.checked
                                ? [...prev.tag, key]
                                : prev.tag.filter((item) => item !== key),
                            }))
                          }
                        />

                        <label htmlFor={key} className="pl-2">
                          {key}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <select
                  name="mood"
                  id="mood"
                  className="border px-3 rounded-sm bg-white text-black text-sm border-blue-500"
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, mood: e.target.value })
                  }
                >
                  <option value="">Filter By Mood</option>
                  <option value="HAPPY">😄 Happy</option>
                  <option value="SAD">😢 Sad</option>
                  <option value="EXCITED">🤩 Excited</option>
                  <option value="CALM">😌 Calm</option>
                  <option value="ANXIOUS">😟 Anxious</option>
                  <option value="STRESSED">😣 Stressed</option>
                  <option value="NEUTRAL">😐 Neutral</option>
                </select>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Header;
