import Navbar from "./Navbar";

const TotalScoreCalculation = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl font-bold text-center mb-8">
          Ranking and Scoring Logic
        </h1>
        <div className="rounded-lg p-3">
          <p className="text-lg mb-6">
            This document explains how the total score for each user is
            calculated, which is then used to rank them. The total score is a
            weighted sum of scores from five different competitive programming
            platforms.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4">
            Total Score Calculation
          </h2>
          <p className="text-lg mb-4">
            The total score is the sum of the scores from each platform:
          </p>
          <div className="bg-zinc-900/30 border border-zinc-900 rounded-lg p-4 my-4 overflow-x-auto">
            <code className="text-lg">
              Total Score = Codeforces Score + LeetCode Score + GeeksforGeeks
              Score + CodeChef Score + HackerRank Score
            </code>
          </div>

          <hr className="border-zinc-700 my-8" />

          <div id="platforms">
            <h2 className="text-3xl font-semibold mt-8 mb-6">
              Platform-Specific Scoring
            </h2>

            {/* Codeforces */}
            <div className="platform border border-zinc-800 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-bold mb-3">
                Codeforces (Weight: 0.5)
              </h3>
              <p className="text-lg mb-4">
                The Codeforces score is calculated based on the user's rating
                and the number of contests they have participated in.
              </p>
              <div className="formula bg-zinc-900/30 border border-zinc-900 rounded-lg p-4 my-4 overflow-x-auto">
                <code className="text-lg">
                  Score = ( (max(Rating - 800, 0))^2 / 10 + Contests * 50 ) *
                  0.5
                </code>
              </div>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">Rating</code>:
                  The user's Codeforces rating. A baseline of 800 is
                  subtracted, so only ratings above 800 contribute.
                </li>
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">
                    Contests
                  </code>
                  : The number of contests the user has participated in.
                </li>
              </ul>
            </div>

            {/* LeetCode */}
            <div className="platform border border-zinc-800 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-bold mb-3">
                LeetCode (Weight: 0.4)
              </h3>
              <p className="text-lg mb-4">
                The LeetCode score is based on the user's rating and contest
                participation.
              </p>
              <div className="formula bg-zinc-900/30 border border-zinc-900 rounded-lg p-4 my-4 overflow-x-auto">
                <code className="text-lg">
                  Score = ( (max(Rating - 1300, 0))^2 / 10 + Contests * 50 ) *
                  0.4
                </code>
              </div>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">Rating</code>:
                  The user's LeetCode rating. A baseline of 1300 is
                  subtracted.
                </li>
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">
                    Contests
                  </code>
                  : The number of contests the user has participated in.
                </li>
              </ul>
            </div>

            {/* GeeksforGeeks */}
            <div className="platform border border-zinc-800 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-bold mb-3">
                GeeksforGeeks (Weight: 0.3)
              </h3>
              <p className="text-lg mb-4">
                The GeeksforGeeks score is calculated from the contest rating
                and the number of contests attended.
              </p>
              <div className="formula bg-zinc-900/30 border border-zinc-900 rounded-lg p-4 my-4 overflow-x-auto">
                <code className="text-lg">
                  Score = ( (max(Contest Rating - 1400, 0))^2 / 10 + Contests
                  Attended * 50 ) * 0.3
                </code>
              </div>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">
                    Contest Rating
                  </code>
                  : The user's GFG contest rating. A baseline of 1400 is
                  subtracted.
                </li>
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">
                    Contests Attended
                  </code>
                  : The number of contests the user has attended.
                </li>
              </ul>
            </div>

            {/* CodeChef */}
            <div className="platform border border-zinc-800 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-bold mb-3">
                CodeChef (Weight: 0.2)
              </h3>
              <p className="text-lg mb-4">
                The CodeChef score depends on the user's rating and the number
                of contests they have participated in.
              </p>
              <div className="formula bg-zinc-900/30 border border-zinc-900 rounded-lg p-4 my-4 overflow-x-auto">
                <code className="text-lg">
                  Score = ( (max(Rating - 1200, 0))^2 / 10 + Contests * 50 ) *
                  0.2
                </code>
              </div>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">Rating</code>:
                  The user's CodeChef rating. A baseline of 1200 is
                  subtracted.
                </li>
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">
                    Contests
                  </code>
                  : The number of contests the user has participated in.
                </li>
              </ul>
            </div>

            {/* HackerRank */}
            <div className="platform border border-zinc-800 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-bold mb-3">
                HackerRank (Weight: 0.1)
              </h3>
              <p className="text-lg mb-4">
                The HackerRank score is directly proportional to the user's
                rating.
              </p>
              <div className="formula bg-zinc-900/30 border border-zinc-900 rounded-lg p-4 my-4 overflow-x-auto">
                <code className="text-lg">Score = Rating * 0.1</code>
              </div>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">Rating</code>:
                  The user's HackerRank rating.
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mt-12 mb-4">Final Ranking</h2>
          <p className="text-lg">
            After calculating the{" "}
            <code className="bg-zinc-800 px-2 py-1 rounded">totalScore</code>{" "}
            for every user, they are sorted in descending order based on this
            score to generate the final ranking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalScoreCalculation;