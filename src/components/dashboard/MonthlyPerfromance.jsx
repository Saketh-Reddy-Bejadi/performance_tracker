const MonthlyPerfromance = ({ dashboardData }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  // Get previous month
  const previousDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  const previousMonth = previousDate.toLocaleString('default', { month: 'long' });
  const previousYear = previousDate.getFullYear();

  return (
    <div>
      {dashboardData?.monthlySummary ? (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Monthly Performance Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Current Month */}
            <div className="backdrop-blur-sm bg-black/30 border border-zinc-800/50 rounded-2xl p-6 hover:border-zinc-300/20 hover:scale-102 transition-transform duration-300 ease-out">
              <h3 className="text-lg font-semibold mb-4">
                {currentMonth} {currentYear}
              </h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {dashboardData.monthlySummary.currentMonthContests}
                </div>
                <div className="text-zinc-400 mb-3">Contests Participated</div>
                
                {/* Consistency Bar */}
                <div className="w-full bg-zinc-800 rounded-full h-2 mb-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(dashboardData.monthlySummary.consistency || 0, 100)}%` }}
                  ></div>
                </div>
                <div className="text-sm text-zinc-400">
                  {dashboardData.monthlySummary.consistency || 0}% Consistency
                </div>
              </div>
            </div>

            {/* Previous Month */}
            <div className="backdrop-blur-sm bg-black/30 border border-zinc-800/50 rounded-2xl p-6 hover:border-zinc-300/20 hover:scale-102 transition-transform duration-300 ease-out">
              <h3 className="text-lg font-semibold mb-4 text-zinc-400">
                {previousMonth} {previousYear}
              </h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {dashboardData.monthlySummary.previousMonthContests}
                </div>
                <div className="text-zinc-400">Contests Participated</div>
              </div>
            </div>

            {/* User Stats */}
            <div className="backdrop-blur-sm bg-black/30 border border-zinc-800/50 rounded-2xl p-6 hover:border-zinc-300/20 hover:scale-102 transition-transform duration-300 ease-out">
              <h3 className="text-lg font-semibold mb-4">
                Overall Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Total Score</span>
                  <span className="text-white font-semibold">
                    {dashboardData.userInfo?.totalScore || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Verified</span>
                  <span className={`font-semibold ${dashboardData.userInfo?.isHandlesVerified ? 'text-green-400' : 'text-red-400'}`}>
                    {dashboardData.userInfo?.isHandlesVerified ? '✓ Yes' : '✗ No'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Last Updated */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 rounded-lg border border-zinc-800">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-zinc-400">
                Last updated: {dashboardData.monthlySummary?.lastUpdated ?
                  new Date(dashboardData.monthlySummary.lastUpdated).toLocaleString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Monthly Contest Participation</h2>
          <div className="backdrop-blur-sm bg-black/30 border border-zinc-800/50 rounded-2xl p-6">
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-zinc-400 text-lg mb-2">
                No monthly data available yet
              </p>
              <p className="text-zinc-500 text-sm">
                Start participating in contests to see your monthly performance!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MonthlyPerfromance;
