import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Attributes from "./Attributes";
import StudentData from "./StudentData";
import {
  fetchUsers,
  transformUserData,
  fetchScrapingStats,
} from "../services/api";

const LeaderBoardOutline = () => {
  const { batch } = useParams();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [scrapingStats, setScrapingStats] = useState(null);
  const [showDevNotice, setShowDevNotice] = useState(true);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [users, stats] = await Promise.all([
          fetchUsers(batch),
          fetchScrapingStats(batch),
        ]);

        let transformedData = transformUserData(users);
        transformedData = transformedData.sort(
          (a, b) => parseFloat(b.percentile) - parseFloat(a.percentile)
        );
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
  }, [batch]);

  // Memoized filtered data
  const filteredData = useMemo(() => {
    if (!debouncedSearch.trim()) return data;

    const q = debouncedSearch.trim().toLowerCase();
    return data.filter((row) => {
      // Create a single searchable string for better performance
      const searchableText = [
        row.rollNumber,
        row.codeforces.handle,
        row.gfg.handle,
        row.leetcode.handle,
        row.codechef.handle,
        row.hackerRank.handle,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(q);
    });
  }, [data, debouncedSearch]);

  // Optimized search handler
  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

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
              The data displayed on this leaderboard may not always be accurate,
              as the platform is still under development. Scores and values
              shown here could be incorrect or incomplete.
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
            <div className="flex flex-row items-center">
              <select
                value={batch}
                onChange={(e) => navigate(`/${e.target.value}`)}
                className="w-36 px-3 py-2 rounded bg-zinc-950 text-white border border-zinc-700 outline-none"
              >
                <option value="2026">2026 Batch</option>
                <option value="2027">2027 Batch</option>
              </select>
              {scrapingStats && (
                <div className="text-zinc-400 text-md text-right flex-1">
                  Last updated:{" "}
                  {(() => {
                    const d = new Date(scrapingStats.lastScraped);
                    return `${d.getDate().toString().padStart(2, "0")}/${(
                      d.getMonth() + 1
                    )
                      .toString()
                      .padStart(2, "0")}/${d.getFullYear()}`;
                  })()}
                </div>
              )}
            </div>
            <input
              type="text"
              className="w-full p-2 rounded bg-zinc-900 text-white placeholder-zinc-400 outline-none"
              placeholder="Search by roll number or any handle..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Desktop/Tablet Layout */}
        <div className="hidden md:flex p-4 bg-black border-b border-zinc-800">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-4 flex-1">
              <select
                value={batch}
                onChange={(e) => navigate(`/${e.target.value}`)}
                className="px-3 py-2 rounded bg-zinc-950 text-white border border-zinc-700/40 outline-none"
              >
                <option value="2026">2026 Batch</option>
                <option value="2027">2027 Batch</option>
              </select>
              <input
                type="text"
                className="p-2 rounded bg-zinc-900 text-white placeholder-zinc-400 outline-none flex-1"
                placeholder="Search by roll number or any handle..."
                value={search}
                onChange={handleSearchChange}
              />
            </div>
            {scrapingStats && (
              <div className="text-zinc-400 text-md ml-4 whitespace-nowrap">
                Last updated: {formatTimestamp(scrapingStats.lastScraped)}
              </div>
            )}
          </div>
        </div>

        <div className="max-h-[calc(100vh-80px)] text-black overflow-y-auto border border-zinc-800">
          <table className="min-w-full table-auto border border-zinc-800 text-white">
            <Attributes
              showDetails={showDetails}
              setShowDetails={setShowDetails}
            />
            <StudentData
              data={filteredData}
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
