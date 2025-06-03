import React, { useEffect, useState } from "react";
import AnalyticsCard from "../components/AnalyticsCard";
import { getAnalyticsSummary } from "../service/authService";
import MoodChart from "../components/MoodChart";
import EntriesPerDay from "../components/EntriesPerDay";

function Analytics() {
  const [analytics, setAnalytics] = useState();

  useEffect(() => {
    async function getAnalytics() {
      try {
        const res = await getAnalyticsSummary();
        console.log(res.data);
        setAnalytics(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAnalytics();
  }, []);

  return (
    <>
      {analytics && (
        <>
          {/* Heading */}
          <div className="shadow-lg py-4 mb-5">
            <h1 className="text-2xl font-medium text-center uppercase ">
              Journal Analytics Dashboard
            </h1>
          </div>
          <div className="p-4">
            {/* Analytics Cards */}
            <h1 className="font-medium mb-4">Analytics Overview</h1>
            <div className="flex flex-wrap gap-4 items-center justify-start ">
              <AnalyticsCard
                imageColor={"bg-green-400"}
                borderColor={"border-l-green-400"}
                name="Total Journal Entries"
                value={analytics.totalEntries}
                image={"/journal-white.svg"}
              />
              <AnalyticsCard
                imageColor={"bg-amber-400"}
                borderColor={"border-l-amber-400"}
                name="Total Word Count"
                value={analytics.totalWordCount}
                image={"/word.svg"}
              />
              <AnalyticsCard
                imageColor={"bg-blue-400"}
                borderColor={"border-l-blue-400"}
                name="Avg Word Count"
                value={analytics.avgWordsPerEntry}
                image={"/word.svg"}
              />
              <AnalyticsCard
                imageColor={"bg-purple-400"}
                borderColor={"border-l-purple-400"}
                name="Current Streak"
                value={analytics.currentStreak}
                image={"/fire.svg"}
              />
              <AnalyticsCard
                imageColor={"bg-red-400"}
                borderColor={"border-l-red-400"}
                name="Longest Streak"
                value={analytics.longestStreak}
                image={"/calendar.svg"}
              />
              <AnalyticsCard
                imageColor={"bg-pink-400"}
                borderColor={"border-l-pink-400"}
                name="Most Frequent Mood"
                value={analytics.mostFrequentMood}
                image={"mood.svg"}
              />
            </div>
          </div>
          {/* Mood Distribution Pie Chart */}
          <div>
            <MoodChart />
          </div>
          {/* Entries Per Day Bar Chart */}
          <div>
            <EntriesPerDay />
          </div>
        </>
      )}
    </>
  );
}

export default Analytics;
