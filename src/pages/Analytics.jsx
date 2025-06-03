import React, { useEffect, useState } from "react";
import AnalyticsCard from "../components/AnalyticsCard";
import { getAnalyticsSummary } from "../service/authService";
import MoodChart from "../components/MoodChart";
import EntriesPerDay from "../components/EntriesPerDay";
import WordCountTrendChart from "../components/WordCountTrendChart";
import Streak from "../components/Streak";

function Analytics() {
  const [analytics, setAnalytics] = useState();

  useEffect(() => {
    async function getAnalytics() {
      try {
        const res = await getAnalyticsSummary();
        // console.log(res.data);
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
          <div className="p-4 mb-8">
            {/* Analytics Cards */}
            <h1 className="font-medium text-lg pl-4 mb-4">
              Analytics Overview
            </h1>
            <div className="flex flex-wrap gap-8 items-center justify-center ">
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
          <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
            <div className="shadow-lg py-2 px-4 rounded-lg border-2 border-gray-200">
              <h1 className="text-lg font-medium h-12">Mood Distribution</h1>
              <MoodChart moodData={analytics.moodDistribution} />
            </div>
            {/* Word Count Per Day Line Chart */}
            <div className="shadow-lg py-2 px-4 rounded-lg border-2 border-gray-200">
              <h1 className="text-lg font-medium h-12">Word Count Per Day</h1>
              <WordCountTrendChart />
            </div>
          </div>
          {/* Entries Per Day Bar Chart */}
          <div>
            <h1 className="text-lg font-medium h-12 pl-8">
              Total Entries Per Day
            </h1>
            <EntriesPerDay entryData={analytics.entriesPerDay} />
          </div>
          <div className="mb-10">
            <h1 className="text-lg font-medium h-12 pl-10 mt-3 ">
              Journal Streak
            </h1>
            <Streak
              currentStreak={analytics.currentStreak}
              longestStreak={analytics.longestStreak}
            />
          </div>
        </>
      )}
    </>
  );
}

export default Analytics;
