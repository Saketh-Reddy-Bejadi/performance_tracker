import { useState, useEffect } from "react";
import Attributes from "./Attributes";
import StudentData from "./StudentData";
import { fetchUsers, transformUserData } from "../services/api";

const LeaderBoardOutline = () => {
  const [showDetails, setShowDetails] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <div className="max-h-screen text-black overflow-y-auto border border-zinc-800">
          <table className="min-w-full table-auto border border-zinc-800 text-white">
            <Attributes
              showDetails={showDetails}
              setShowDetails={setShowDetails}
            />
            <StudentData
              data={data}
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
