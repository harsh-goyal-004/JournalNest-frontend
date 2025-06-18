import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import CreateJournal from "../components/CreateJournal";
import Starred from "../components/Starred";
import Settings from "../pages/Settings";
import Analytics from "../pages/Analytics";
import ViewSingleEntry from "../components/ViewSingleEntry";
import { getAllEntries } from "../service/authService";
import SearchResults from "../components/SearchResults";
import Header from "../components/Header";

function JournalLayout() {
  const [view, setView] = useState({ type: "", data: null });
  const [allEntries, setAllEntries] = useState([]);

  async function fetchEntries() {
    try {
      const response = await getAllEntries();
      setAllEntries(response.data.content);
    } catch (error) {
      console.error("Error fetching entries", error);
    }
  }

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <>
      <Header auth={true} setView={setView} />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/5 border-r-2 min-h-screen overflow-y-auto bg-gray-100 border-gray-300">
          <Sidebar setView={setView} allEntries={allEntries} />
        </div>
        {/* Main View */}
        <div className="w-4/5 h-screen overflow-y-auto">
          {view.type === "New Entry" && (
            <CreateJournal onCreate={fetchEntries} edit={view.data} />
          )}
          {view.type === "Starred" && <Starred setView={setView} />}
          {view.type === "Analytics" && <Analytics />}
          {view.type === "Settings" && <Settings />}
          {view.type === "SearchResults" && (
            <SearchResults data={view.data} setView={setView} />
          )}
          {view.type === "Entry" && (
            <ViewSingleEntry
              key={view.data.id}
              data={view.data}
              onDelete={() => {
                setView({ type: "", data: null });
                fetchEntries();
              }}
              onEdit={() => {
                setView({
                  type: "New Entry",
                  data: { ...view.data, editmode: true },
                });
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default JournalLayout;
