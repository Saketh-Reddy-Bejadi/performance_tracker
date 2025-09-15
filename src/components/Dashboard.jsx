import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { fetchDashboardData } from "../services/api";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoadingSkeleton from "./dashboard/LoadingSkeleton";
import ErrorDisplay from "./dashboard/ErrorDisplay";
import PlatformCard from "./dashboard/PlatformCard";
import MonthlyPerfromance from "./dashboard/MonthlyPerfromance";

const Dashboard = () => {
  const { batch } = useParams();
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchDashboardData(batch, token);
      setDashboardData(data);
    } catch (err) {
      setError(err.message);
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  }, [batch, token]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    loadDashboardData();
  }, [isAuthenticated, navigate, loadDashboardData]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-5">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 mt-20 w-full mb-20">
          

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Platform Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {Object.entries(dashboardData?.platforms || {}).map(
                ([platform, data]) => (
                  <PlatformCard
                    key={platform}
                    platform={platform}
                    data={data}
                  />
                )
              )}
            </div>
          </div>
          <MonthlyPerfromance dashboardData={dashboardData}/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
