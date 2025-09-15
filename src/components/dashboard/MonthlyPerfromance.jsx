const MonthlyPerfromance = ({dashboardData}) => {
  return (
    <div>
      {dashboardData?.streakInfo?.monthlySummary ? (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Monthly Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Month */}
            <div className="backdrop-blur-sm bg-black/30 border border-zinc-800/50 rounded-2xl p-6 hover:border-zinc-300/20 hover:scale-102 transition-transform duration-300 ease-out">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">
                Current Month
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Problems Solved</span>
                  <span className="text-white font-semibold">
                    {dashboardData.streakInfo.monthlySummary.currentMonth
                      ?.problemsSolved || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Contests Participated</span>
                  <span className="text-white font-semibold">
                    {dashboardData.streakInfo.monthlySummary.currentMonth
                      ?.contestsParticipated || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Previous Month */}
            <div className="backdrop-blur-sm bg-black/30 border border-zinc-800/50 rounded-2xl p-6 hover:border-zinc-300/20 hover:scale-102 transition-transform duration-300 ease-out">
              <h3 className="text-lg font-semibold mb-4 text-zinc-400">
                Previous Month
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Problems Solved</span>
                  <span className="text-white font-semibold">
                    {dashboardData.streakInfo.monthlySummary.previousMonth
                      ?.problemsSolved || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Contests Participated</span>
                  <span className="text-white font-semibold">
                    {dashboardData.streakInfo.monthlySummary.previousMonth
                      ?.contestsParticipated || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Monthly Performance</h2>
          <div className="backdrop-blur-sm bg-black/30 border border-zinc-800/50 rounded-2xl p-6">
            <p className="text-zinc-400 text-center">
              Monthly performance data is not available yet.
              {dashboardData
                ? "Data structure: " +
                  JSON.stringify(Object.keys(dashboardData), null, 2)
                : "No dashboard data"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default MonthlyPerfromance;
