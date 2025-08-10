import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { Link } from "react-router-dom";
import { ShimmerButton } from "./magicui/shimmer-button";

const Hero = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <AnimatedGridPattern
        numSquares={40}
        maxOpacity={0.2}
        duration={2}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[130%] skew-y-12 z-0"
        )}
      />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-5">
        <nav className="w-full max-w-6xl xl:h-15 h-12 backdrop-blur-sm bg-black/30 border border-zinc-800 flex items-center p-5 rounded-2xl justify-between fixed top-5">
          <h1 className="text-xl font-bold tracking-wider">CodeTrackr</h1>
          <Link to={"/update-handles"}>
            <button className="cursor-pointer bg-zinc-900 px-5 py-2 rounded-lg hover:bg-zinc-800 transition-colors duration-300">
              <span className="hidden sm:inline">Update Username</span>
              <span className="inline sm:hidden text-sm">Update</span>
            </button>
          </Link>
        </nav>

        <main className="flex flex-col items-center justify-center text-center w-full h-screen">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
            Track. Compete. Conquer.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-zinc-300 max-w-3xl">
            Your unified leaderboard for competitive programming. We scrape and sync your scores from top platforms, so you can focus on climbing the ranks.
          </p>
          
          <div className="flex items-center justify-center space-x-6 mt-8">
            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/leetcode.svg" alt="LeetCode" className="h-8 w-8 invert" />
            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/codeforces.svg" alt="Codeforces" className="h-8 w-8 invert" />
            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/codechef.svg" alt="CodeChef" className="h-8 w-8 invert" />
            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/hackerrank.svg" alt="HackerRank" className="h-8 w-8 invert" />
            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/geeksforgeeks.svg" alt="GeeksforGeeks" className="h-8 w-8 invert" />
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-5">View Leaderboards</h2>
            <div className="flex gap-5 flex-wrap justify-center">
              {["2026", "2027"].map((batch) => (
                <Link to={`/${batch}`} key={batch}>
                  <ShimmerButton className="shadow-2xl">
                    <span className="whitespace-pre-wrap text-center text-lg font-medium leading-none tracking-tight text-white px-8 py-3">
                      Batch {batch}
                    </span>
                  </ShimmerButton>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Hero;
