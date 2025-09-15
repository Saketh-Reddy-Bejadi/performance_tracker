const platformIcons = {
  codeforces:
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/codeforces.svg",
  leetcode: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/leetcode.svg",
  gfg: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/geeksforgeeks.svg",
  codechef: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/codechef.svg",
  hackerrank:
    "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/hackerrank.svg",
};

const platformNames = {
  codeforces: "Codeforces",
  leetcode: "LeetCode",
  gfg: "GeeksForGeeks",
  codechef: "CodeChef",
  hackerrank: "HackerRank",
};

const PlatformCard = ({ platform, data }) => {
  return (
    <div
      key={platform}
      className="p-6 rounded-2xl border-zinc-200/10 shadow-md border hover:shadow-xl hover:border-zinc-300/20 hover:scale-102 transition-transform duration-300 ease-out cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-800/40 transition">
            <img
              src={platformIcons[platform]}
              alt={platformNames[platform]}
              className="w-6 h-6 invert"
            />
          </div>
        </div>
        <span className="text-zinc-200 font-semibold text-xl">
          {parseInt(data.rating || data.contestRating || data.codingScore || 0)}
        </span>
      </div>

      <p className="text-zinc-300 font-medium mb-3">
        {data.handle || "Not set"}
      </p>

      {data.contests !== undefined && (
        <div className="text-sm text-zinc-400">
          Contests:{" "}
          <span className="font-medium text-zinc-200">{data.contests}</span>
        </div>
      )}
    </div>
  );
};

export default PlatformCard;
