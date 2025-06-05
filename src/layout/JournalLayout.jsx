import { useState } from "react";
import Sidebar from "../components/Sidebar";
import CreateJournal from "../components/CreateJournal";
import Starred from "../components/Starred";
import Settings from "../pages/Settings";
import Analytics from "../pages/Analytics";
import ViewSingleEntry from "../components/ViewSingleEntry";

function JournalLayout() {
  const [view, setView] = useState({ type: "", data: null });
  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/5 border-r-2 min-h-screen bg-gray-100 border-gray-300">
          <Sidebar setView={setView} />
        </div>
        {/* Main View */}
        <div className="w-4/5">
          {view.type === "New Entry" && <CreateJournal />}
          {view.type === "Starred" && <Starred />}
          {view.type === "Analytics" && <Analytics />}
          {view.type === "Settings" && <Settings />}
          {view.type === "Entry" && (
            <ViewSingleEntry key={view.data.id} data={view.data} />
          )}
        </div>
      </div>
    </>
  );
}

export default JournalLayout;
