import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { Link } from "react-router-dom";
import { ShimmerButton } from "./magicui/shimmer-button";
const Hero = () => {
  return (
    <>
      <div className="relative h-screen w-full overflow-hidden bg-black xl:px-5 py-5 px-2 flex items-center flex-col">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={1.5}
          repeatDelay={0.3}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[130%] skew-y-12"
          )}
        />
        <nav className="w-11/12 xl:h-15 h-12 backdrop-blur-xs bg-zinc-700/5 border border-zinc-900 flex items-center xl:p-5 px-3 rounded-2xl justify-between fixed top-5">
          <h1 className="xl:text-lg text-sm">Tracker-CMRIT</h1>
          <Link to={"/update-handles"}>
            <button className="cursor-pointer bg-zinc-900 px-5 xl:py-2 rounded-lg hover:bg-zinc-950 py-1">
              <span className="hidden sm:inline">Update Username</span>
              <span className="inline sm:hidden text-sm">Update</span>
            </button>
          </Link>
        </nav>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-full flex flex-col items-center">
            <h1 className="xl:text-5xl text-3xl"> Track. Compare. Excel.</h1>
            <h2 className="text-center mt-5">
              Unified Leaderboard for Competitive Programming Scores Across
              Platforms
            </h2>
          </div>
          <div className="flex gap-5 mt-5 flex-wrap justify-center">
            {["2026", "2027"].map((batch) => (
              <Link to={`/${batch}`} key={batch} >
                <ShimmerButton className="shadow-2xl">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg px-5">
                    {batch}
                  </span>
                </ShimmerButton>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Hero;
