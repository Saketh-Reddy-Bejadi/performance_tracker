import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { Link } from "react-router-dom";
import { ShimmerButton } from "./magicui/shimmer-button";
import Navbar from "./Navbar";

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
        <Navbar />

        <main className="flex flex-col items-center justify-center text-center w-full h-screen">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
            Track. Compete. Conquer.
          </h1>
          <p className="mt-4 text-md md:text-xl text-zinc-300 max-w-3xl">
            Your unified leaderboard for competitive programming. We scrape and
            sync your scores from top platforms, so you can focus on climbing
            the ranks.
          </p>

          <div className="mt-10">
            <h2 className="xl:text-2xl text-lg font-semibold mb-5">
              View Leaderboards
            </h2>
            <div className="flex gap-5 flex-wrap justify-center">
              {["2026", "2027"].map((batch) => (
                <Link to={`/${batch}`} key={batch}>
                  <ShimmerButton className="shadow-2xl">
                    <span className="whitespace-pre-wrap text-center xl:text-lg text-md font-medium leading-none tracking-tight text-white xl:px-5 xl:py-1">
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
