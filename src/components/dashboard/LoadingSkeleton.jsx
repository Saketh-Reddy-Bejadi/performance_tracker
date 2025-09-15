import Navbar from "../Navbar";
import Footer from "../Footer";

const LoadingSkeleton = () => (
  <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-5">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 mt-20 w-full">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-zinc-700/50 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-40 bg-zinc-700/50 rounded-2xl border border-zinc-600/30"
              ></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-zinc-700/50 rounded-2xl border border-zinc-600/30"></div>
            <div className="h-96 bg-zinc-700/50 rounded-2xl border border-zinc-600/30"></div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default LoadingSkeleton;
