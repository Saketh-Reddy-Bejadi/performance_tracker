import Navbar from "../Navbar";
import Footer from "../Footer";

const ErrorDisplay = ({ error }) => (
  <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-5">
      <Navbar />
      <div className="flex items-center justify-center flex-1">
        <div className="text-center backdrop-blur-sm bg-black/30 border border-zinc-800/50 rounded-2xl p-8">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-zinc-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-zinc-900 hover:bg-zinc-950 rounded-lg transition-colors border border-zinc-800"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default ErrorDisplay;
