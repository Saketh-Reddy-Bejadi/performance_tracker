import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import Attributes from "./Attributes";
import StudentData from "./StudentData";
import SkeletonLoader from "./SkeletonLoader";
import TopLoader from "./TopLoader";
import { fetchUsers, transformUserData, fetchScrapingStats } from "../services/api";

const InfiniteScrollLeaderboard = () => {
  const { batch } = useParams();
  const [showDetails, setShowDetails] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [scrapingStats, setScrapingStats] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 100, // Increased for better performance
    total: 0,
    hasMore: true
  });

  const searchTimeoutRef = useRef(null);

  // Debounce search input
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // Increased debounce time

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search]);

  // Load data function
  const loadData = useCallback(async (page = 1, reset = false, searchTerm = "") => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      const response = await fetchUsers(batch, page, 100, searchTerm);
      const transformedData = transformUserData(response.users);

      if (reset || page === 1) {
        setData(transformedData);
      } else {
        setData(prev => [...prev, ...transformedData]);
      }

      setPagination(prev => ({
        ...prev,
        page: response.currentPage,
        total: response.total,
        hasMore: response.hasMore
      }));

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [batch]);

  // Initial load and search handling
  useEffect(() => {
    if (batch) {
      setPagination(prev => ({ ...prev, page: 1 }));
      setData([]);
      loadData(1, true, debouncedSearch);
    }
  }, [batch, debouncedSearch, loadData]);

  // Load more function
  const handleLoadMore = useCallback(() => {
    if (!loadingMore && pagination.hasMore) {
      loadData(pagination.page + 1, false, debouncedSearch);
    }
  }, [loadData, loadingMore, pagination.hasMore, pagination.page, debouncedSearch]);

  // Load scraping stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        const stats = await fetchScrapingStats(batch);
        setScrapingStats(stats);
      } catch (err) {
        console.error("Failed to load scraping stats:", err);
      }
    };

    if (batch) {
      loadStats();
    }
  }, [batch]);

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  if (loading && data.length === 0) {
    return (
      <>
        <TopLoader isVisible={loading || loadingMore} />
        <div className="overflow-hidden">
          {/* Mobile Layout */}
          <div className="md:hidden p-4 bg-black border-b border-zinc-800">
            <div className="flex flex-col space-y-4">
              <div className="text-zinc-400 text-md text-center">
                <div className="h-4 w-32 bg-zinc-700 rounded mx-auto animate-pulse"></div>
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
                <input
                  type="text"
                  className="p-2 rounded bg-zinc-900 text-white placeholder-zinc-400 outline-none flex-1"
                  placeholder="Search by roll number or any handle..."
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="text-zinc-400 text-md ml-4 whitespace-nowrap">
                <div className="h-4 w-32 bg-zinc-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="max-h-[calc(100vh-80px)] text-black overflow-y-auto border border-zinc-800">
            <table className="min-w-full table-auto border border-zinc-800 text-white">
              <Attributes
                showDetails={showDetails}
                setShowDetails={setShowDetails}
              />
              <SkeletonLoader showDetails={showDetails} />
            </table>
          </div>
        </div>
      </>
    );
  }

  if (error && data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      <TopLoader isVisible={loading || loadingMore} />
      <div className="overflow-hidden">
        {/* Mobile Layout */}
        <div className="md:hidden p-4 bg-black border-b border-zinc-800">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-center justify-center">
              {scrapingStats && (
                <div className="text-zinc-400 text-md">
                  Last updated: {formatTimestamp(scrapingStats.lastScraped)}
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

        <div
          className="max-h-[calc(100vh-80px)] text-black overflow-y-auto border border-zinc-800"
          onScroll={(e) => {
            const { scrollTop, scrollHeight, clientHeight } = e.target;
            const isNearBottom = scrollTop + clientHeight >= scrollHeight - 200;

            if (isNearBottom && pagination.hasMore && !loadingMore) {
              handleLoadMore();
            }
          }}
        >
          <table className="min-w-full table-auto border border-zinc-800 text-white">
            <Attributes
              showDetails={showDetails}
              setShowDetails={setShowDetails}
            />
            <StudentData
              data={data}
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

export default InfiniteScrollLeaderboard;