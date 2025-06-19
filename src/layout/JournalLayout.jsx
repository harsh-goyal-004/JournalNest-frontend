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
  const [loadMoreEntries, setLoadMoreEntries] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function fetchEntries() {
    try {
      const response = await getAllEntries(loadMoreEntries);

      setAllEntries((prev) => {
        const newEntries = response.data.content.filter(
          (entry) => !prev.some((e) => e.id === entry.id)
        );
        return [...prev, ...newEntries];
      });
    } catch (error) {
      console.error("Error fetching entries", error);
    }
  }

  useEffect(() => {
    fetchEntries();
  }, [loadMoreEntries]);

  return (
    <>
      <Header auth={true} setView={setView} setSidebarOpen={setSidebarOpen} />
      <div className="md:flex">
        {/* Sidebar */}
        <div
          className={`  ${
            sidebarOpen ? "block" : "hidden md:block"
          } w-full md:w-1/5 border-r-2 min-h-screen overflow-y-auto bg-gray-100 border-gray-30`}
        >
          <Sidebar
            setView={setView}
            allEntries={allEntries}
            loadMoreEntries={loadMoreEntries}
            setLoadMoreEntry={setLoadMoreEntries}
            setSidebarOpen={setSidebarOpen}
          />
        </div>
        {/* Main View */}
        <div className="w-full md:w-4/5 h-screen overflow-y-auto">
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
