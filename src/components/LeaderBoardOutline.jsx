import { useState, useEffect } from "react";
import Attributes from "./Attributes";
import StudentData from "./StudentData";
import {
  fetchUsers,
  transformUserData,
  fetchScrapingStats,
} from "../services/api";

const LeaderBoardOutline = () => {
  const [showDetails, setShowDetails] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [scrapingStats, setScrapingStats] = useState(null);
  const [showDevNotice, setShowDevNotice] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch users and scraping stats in parallel
        const [users, stats] = await Promise.all([
          fetchUsers(),
          fetchScrapingStats(),
        ]);

        let transformedData = transformUserData(users);
        // Sort by percentile (descending)
        transformedData = transformedData.sort(
          (a, b) => parseFloat(b.percentile) - parseFloat(a.percentile)
        );
        // Assign fixed serial number (rank) based on sorted order
        transformedData = transformedData.map((user, idx) => ({
          ...user,
          serial: idx + 1,
        }));

        setData(transformedData);
        setScrapingStats(stats);
      } catch (err) {
        setError(err.message);
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filterData = (row) => {
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    return (
      row.rollNumber.toLowerCase().includes(q) ||
      row.codeforces.handle.toLowerCase().includes(q) ||
      row.gfg.handle.toLowerCase().includes(q) ||
      row.leetcode.handle.toLowerCase().includes(q) ||
      row.codechef.handle.toLowerCase().includes(q) ||
      row.hackerRank.handle.toLowerCase().includes(q)
    );
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      const date = new Date(timestamp);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const time = date.toLocaleTimeString();
      return `${day}/${month}/${year}, ${time}`;
    } catch {
      return "Invalid timestamp";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      {/* Development Notice Popup */}
      {showDevNotice && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-yellow-400 text-lg font-semibold">
                🚧 Development Notice
              </h3>
              <button
                onClick={() => setShowDevNotice(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="text-zinc-300 mb-4">
              The data displayed on this leaderboard may not always be accurate, as the platform is still under development. Scores and values shown here could be incorrect or incomplete.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDevNotice(false)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-hidden">
        {/* Mobile Layout */}
        <div className="md:hidden p-4 bg-black border-b border-zinc-800">
          <div className="flex flex-col space-y-4">
            {scrapingStats && (
              <div className="text-zinc-400 text-md text-center">
                Last updated: {formatTimestamp(scrapingStats.lastScraped)}
              </div>
            )}
            <input
              type="text"
              className="w-full p-2 rounded bg-zinc-900 text-white placeholder-zinc-400 outline-none"
              placeholder="Search by roll number or any handle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Desktop/Tablet Layout */}
        <div className="hidden md:flex p-4 bg-black border-b border-zinc-800">
          <div className="flex justify-between items-center w-full">
            <input
              type="text"
              className="flex-1 p-2 rounded bg-zinc-900 text-white placeholder-zinc-400 outline-none mr-4"
              placeholder="Search by roll number or any handle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {scrapingStats && (
              <div className="text-zinc-400 text-md">
                Last updated: {formatTimestamp(scrapingStats.lastScraped)}
              </div>
            )}
          </div>
        </div>

        <div className="max-h-screen text-black overflow-y-auto border border-zinc-800">
          <table className="min-w-full table-auto border border-zinc-800 text-white">
            <Attributes
              showDetails={showDetails}
              setShowDetails={setShowDetails}
            />
            <StudentData
              data={data.filter(filterData)}
              showDetails={showDetails}
              setShowDetails={setShowDetails}
              showSerialNumber={true}
            />
          </table>
        </div>
      </div>
    </>
  );
};
export default LeaderBoardOutline;
