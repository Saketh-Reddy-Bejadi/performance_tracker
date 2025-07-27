import { useState, useEffect } from "react";
import Attributes from "./Attributes";
import StudentData from "./StudentData";
import { fetchUsers, transformUserData } from "../services/api";

const LeaderBoardOutline = () => {
  const [showDetails, setShowDetails] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const users = await fetchUsers();
        const transformedData = transformUserData(users);
        setData(transformedData);
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
      <div className="overflow-hidden">
        <div className="p-4 bg-black border-b border-zinc-800">
          <input
            type="text"
            className="w-full p-2 rounded bg-zinc-900 text-white placeholder-zinc-400 outline-none"
            placeholder="Search by roll number or any handle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
            />
          </table>
        </div>
      </div>
    </>
  );
};
export default LeaderBoardOutline;
