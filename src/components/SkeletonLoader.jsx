import React from "react";

const SkeletonLoader = ({ showDetails }) => {
  // Generate skeleton rows
  const skeletonRows = Array.from({ length: 10 }, (_, index) => (
    <tr key={index} className="animate-pulse">
      <td className="px-4 py-5">
        <div className="h-4 w-8 bg-zinc-700 rounded"></div>
      </td>
      <td className="px-4 py-5">
        <div className="h-4 w-20 bg-zinc-700 rounded"></div>
      </td>
      {showDetails ? (
        <>
          {/* Codeforces */}
          <td className="px-4 py-5">
            <div className="h-4 w-16 bg-zinc-700 rounded"></div>
          </td>
          <td className="px-4 py-5">
            <div className="h-4 w-12 bg-zinc-700 rounded"></div>
          </td>
          <td className="px-4 py-5">
            <div className="h-4 w-8 bg-zinc-700 rounded"></div>
          </td>
          {/* GFG */}
          <td className="px-4 py-5">
            <div className="h-4 w-16 bg-zinc-700 rounded"></div>
          </td>
          <td className="px-4 py-5">
            <div className="h-4 w-12 bg-zinc-700 rounded"></div>
          </td>
          <td className="px-4 py-5">
            <div className="h-4 w-12 bg-zinc-700 rounded"></div>
          </td>
          <td className="px-4 py-5">
            <div className="h-4 w-8 bg-zinc-700 rounded"></div>
          </td>
          {/* LeetCode */}
          <td className="px-4 py-5">
            <div className="h-4 w-16 bg-zinc-700 rounded"></div>
          </td>
          <td className="px-4 py-5">
            <div className="h-4 w-12 bg-zinc-700 rounded"></div>
          </td>
          <td className="px-4 py-5">
            <div className="h-4 w-8 bg-zinc-700 rounded"></div>
          </td>
          {/* CodeChef */}
          <td className="px-4 py-5">
            <div className="h-4 w-16 bg-zinc-700 rounded"></div>
          </td>
          <td className="px-4 py-5">
            <div className="h-4 w-12 bg-zinc-700 rounded"></div>
          </td>
          <td className="px-4 py-5">
            <div className="h-4 w-8 bg-zinc-700 rounded"></div>
          </td>
          {/* HackerRank */}
          <td className="px-4 py-5">
            <div className="h-4 w-16 bg-zinc-700 rounded"></div>
          </td>
          <td className="px-4 py-5">
            <div className="h-4 w-12 bg-zinc-700 rounded"></div>
          </td>
          {/* Percentile */}
          <td className="px-4 py-5">
            <div className="h-4 w-12 bg-zinc-700 rounded"></div>
          </td>
        </>
      ) : (
        <>
          {/* Compact view */}
          <td className="px-4 py-5">
            <div className="h-4 w-12 bg-zinc-700 rounded"></div>
          </td>
          <td className="px-4 py-5">
            <div className="h-4 w-12 bg-zinc-700 rounded"></div>
          </td>
          <td className="px-4 py-5">
            <div className="h-4 w-12 bg-zinc-700 rounded"></div>
          </td>
          <td className="px-4 py-5">
            <div className="h-4 w-12 bg-zinc-700 rounded"></div>
          </td>
          <td className="px-4 py-5">
            <div className="h-4 w-12 bg-zinc-700 rounded"></div>
          </td>
          <td className="px-4 py-5">
            <div className="h-4 w-12 bg-zinc-700 rounded"></div>
          </td>
        </>
      )}
    </tr>
  ));

  return <tbody className="text-white">{skeletonRows}</tbody>;
};

export default SkeletonLoader;
