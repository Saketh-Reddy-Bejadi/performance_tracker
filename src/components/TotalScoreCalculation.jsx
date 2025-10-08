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
            The total score uses a balanced approach that emphasizes contest participation while considering ratings:
          </p>
          <div className="bg-zinc-900/30 border border-zinc-900 rounded-lg p-4 my-4 overflow-x-auto">
            <code className="text-lg">
              Platform Score = ((Contests × Weight × 0.85) + (Rating × Weight ÷ 50 × 0.15)) × 100
            </code>
          </div>
          <div className="bg-zinc-900/30 border border-zinc-900 rounded-lg p-4 my-4 overflow-x-auto">
            <code className="text-lg">
              Total Score = Sum of all Platform Scores
            </code>
          </div>

          <h3 className="text-2xl font-semibold mt-6 mb-4">Platform Weights (Percentage-based)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-zinc-900/30 border border-zinc-900 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Codeforces:</span>
                <span className="text-blue-400 font-bold">30%</span>
              </div>
            </div>
            <div className="bg-zinc-900/30 border border-zinc-900 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">LeetCode:</span>
                <span className="text-yellow-400 font-bold">25%</span>
              </div>
            </div>
            <div className="bg-zinc-900/30 border border-zinc-900 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">GeeksforGeeks:</span>
                <span className="text-green-400 font-bold">20%</span>
              </div>
            </div>
            <div className="bg-zinc-900/30 border border-zinc-900 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">CodeChef:</span>
                <span className="text-orange-400 font-bold">15%</span>
              </div>
            </div>
            <div className="bg-zinc-900/30 border border-zinc-900 rounded-lg p-4 md:col-span-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">HackerRank:</span>
                <span className="text-purple-400 font-bold">10%</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold mb-3 text-amber-300">Scoring Philosophy</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Contest Emphasis (85%):</strong> Rewards active participation and consistency</li>
              <li><strong>Rating Component (15%):</strong> Acknowledges skill level but doesn't dominate</li>
              <li><strong>Balanced Weights:</strong> Distributed across platforms based on competitive value</li>
              <li><strong>Linear Scaling:</strong> Simple, transparent calculation without complex exponentials</li>
            </ul>
          </div>

          <hr className="border-zinc-700 my-8" />

          <div id="platforms">
            <h2 className="text-3xl font-semibold mt-8 mb-6">
              Platform-Specific Scoring
            </h2>

            {/* Codeforces */}
            <div className="platform border border-zinc-800 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-bold mb-3 text-blue-400">
                Codeforces (Weight: 30%)
              </h3>
              <p className="text-lg mb-4">
                Codeforces receives the highest weight due to its prestigious competitive programming contests.
              </p>
              <div className="formula bg-zinc-900/30 border border-zinc-900 rounded-lg p-4 my-4 overflow-x-auto">
                <code className="text-lg">
                  Score = ((Contests × 0.30 × 0.85) + (Rating × 0.30 ÷ 50 × 0.15)) × 100
                </code>
              </div>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">Contests</code>:
                  Number of contests (85% weight) - heavily rewards participation.
                </li>
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">Rating</code>:
                  Current rating scaled by 50 (15% weight) - acknowledges skill.
                </li>
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">
                    Weight
                  </code>
                  : 30% of total score - highest platform priority.
                </li>
              </ul>
            </div>

            {/* LeetCode */}
            <div className="platform border border-zinc-800 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-bold mb-3 text-yellow-400">
                LeetCode (Weight: 25%)
              </h3>
              <p className="text-lg mb-4">
                LeetCode gets significant weight due to its industry relevance and technical interview preparation value.
              </p>
              <div className="formula bg-zinc-900/30 border border-zinc-900 rounded-lg p-4 my-4 overflow-x-auto">
                <code className="text-lg">
                  Score = ((Contests × 0.25 × 0.85) + (Rating × 0.25 ÷ 50 × 0.15)) × 100
                </code>
              </div>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">Contests</code>:
                  Contest participation (85% weight) - encourages regular practice.
                </li>
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">Rating</code>:
                  Contest rating scaled by 50 (15% weight) - reflects problem-solving ability.
                </li>
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">
                    Weight
                  </code>
                  : 25% of total score - second-highest platform priority.
                </li>
              </ul>
            </div>

            {/* GeeksforGeeks */}
            <div className="platform border border-zinc-800 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-bold mb-3 text-green-400">
                GeeksforGeeks (Weight: 20%)
              </h3>
              <p className="text-lg mb-4">
                GeeksforGeeks contributes solid weight for its comprehensive programming contests and educational value.
              </p>
              <div className="formula bg-zinc-900/30 border border-zinc-900 rounded-lg p-4 my-4 overflow-x-auto">
                <code className="text-lg">
                  Score = ((Contests × 0.20 × 0.85) + (Contest Rating × 0.20 ÷ 50 × 0.15)) × 100
                </code>
              </div>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">
                    Contests Attended
                  </code>
                  : Number of contests attended (85% weight) - rewards consistency.
                </li>
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">
                    Contest Rating
                  </code>
                  : GFG contest rating scaled by 50 (15% weight) - measures performance.
                </li>
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">
                    Weight
                  </code>
                  : 20% of total score - solid educational platform contribution.
                </li>
              </ul>
            </div>

            {/* CodeChef */}
            <div className="platform border border-zinc-800 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-bold mb-3 text-orange-400">
                CodeChef (Weight: 15%)
              </h3>
              <p className="text-lg mb-4">
                CodeChef provides meaningful contribution to the overall competitive programming assessment.
              </p>
              <div className="formula bg-zinc-900/30 border border-zinc-900 rounded-lg p-4 my-4 overflow-x-auto">
                <code className="text-lg">
                  Score = ((Contests × 0.15 × 0.85) + (Rating × 0.15 ÷ 50 × 0.15)) × 100
                </code>
              </div>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">Contests</code>:
                  Contest participation (85% weight) - values regular engagement.
                </li>
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">Rating</code>:
                  CodeChef rating scaled by 50 (15% weight) - considers skill level.
                </li>
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">
                    Weight
                  </code>
                  : 15% of total score - balanced competitive programming contribution.
                </li>
              </ul>
            </div>

            {/* HackerRank */}
            <div className="platform border border-zinc-800 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-bold mb-3 text-purple-400">
                HackerRank (Weight: 10%)
              </h3>
              <p className="text-lg mb-4">
                HackerRank contributes the smallest portion, focusing on skill assessment and domain-specific challenges.
              </p>
              <div className="formula bg-zinc-900/30 border border-zinc-900 rounded-lg p-4 my-4 overflow-x-auto">
                <code className="text-lg">
                  Score = ((Contests × 0.10 × 0.85) + (Rating × 0.10 ÷ 50 × 0.15)) × 100
                </code>
              </div>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">Contests</code>:
                  Contest/challenge participation (85% weight) - encourages engagement.
                </li>
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">Rating</code>:
                  HackerRank rating scaled by 50 (15% weight) - reflects domain skills.
                </li>
                <li>
                  <code className="bg-zinc-800 px-2 py-1 rounded">
                    Weight
                  </code>
                  : 10% of total score - complements competitive programming focus.
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mt-12 mb-4">Final Ranking</h2>
          <p className="text-lg mb-4">
            After calculating the{" "}
            <code className="bg-zinc-800 px-2 py-1 rounded">totalScore</code>{" "}
            for every user, they are sorted in descending order based on this
            score to generate the final ranking.
          </p>

          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">Algorithm Highlights</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Contest Priority (85%):</strong> Heavily rewards active participation and consistency</li>
              <li><strong>Rating Balance (15%):</strong> Acknowledges skill without letting it dominate</li>
              <li><strong>Percentage Weights:</strong> Clear distribution - CF(30%) + LC(25%) + GFG(20%) + CC(15%) + HR(10%) = 100%</li>
              <li><strong>Linear Scaling:</strong> Simple, transparent calculations without complex exponentials</li>
              <li><strong>Safe Handling:</strong> Zero values handled gracefully to prevent calculation errors</li>
              <li><strong>Precision:</strong> Final scores calculated to 4 decimal places for accurate ranking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalScoreCalculation;