import { BarChart3, Shield, TrendingUp, Trophy, Users, Zap } from "lucide-react"

const Features = () => {
  return (
    <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose CodeTrackr?
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              The ultimate platform for competitive programmers to track progress, compare performance, and stay motivated.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-black/30 border border-zinc-800/50 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300 group">
              <div className="w-16 h-16 bg-zinc-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Real-time Leaderboards
              </h3>
              <p className="text-zinc-400">
                Live rankings across multiple coding platforms with instant score updates and percentile calculations.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-black/30 border border-zinc-800/50 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300 group">
              <div className="w-16 h-16 bg-zinc-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Performance Analytics
              </h3>
              <p className="text-zinc-400">
                Detailed insights into your coding journey with progress tracking and trend analysis.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-black/30 border border-zinc-800/50 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300 group">
              <div className="w-16 h-16 bg-zinc-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Handle Management
              </h3>
              <p className="text-zinc-400">
                Securely manage your coding platform handles with Google OAuth integration.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-black/30 border border-zinc-800/50 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300 group">
              <div className="w-16 h-16 bg-zinc-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Secure Authentication
              </h3>
              <p className="text-zinc-400">
                Enterprise-grade security with Google OAuth and JWT tokens for safe data access.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-black/30 border border-zinc-800/50 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300 group">
              <div className="w-16 h-16 bg-zinc-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Automated Scraping
              </h3>
              <p className="text-zinc-400">
                Continuous data collection from top coding platforms with scheduled updates.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-black/30 border border-zinc-800/50 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300 group">
              <div className="w-16 h-16 bg-zinc-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Comprehensive Stats
              </h3>
              <p className="text-zinc-400">
                Rich statistics including contest participation, rating changes, and performance metrics.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}
export default Features