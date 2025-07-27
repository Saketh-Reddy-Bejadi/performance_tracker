import React from "react";

const StudentData = ({ data, showDetails }) => {
  // Helper function to display handle or #N/A if empty
  const displayHandle = (handle) => {
    if (!handle || handle.trim() === "") {
      return <span className="text-red-500">#N/A</span>;
    }
    return handle;
  };

  return (
    <>
      <tbody>
        {data.map((row, index) =>
          showDetails ? (
            <tr key={index} className="whitespace-nowrap text-center">
              <td className=" px-4 py-5">{row.serial}</td>
              <td className=" ">{row.rollNumber}</td>
              <td className="">{displayHandle(row.codeforces.handle)}</td>
              <td className="">{row.codeforces.rating}</td>
              <td className="">{row.codeforces.count}</td>
              <td className="">{displayHandle(row.gfg.handle)}</td>
              <td className="">{row.gfg.contestScore}</td>
              <td className="">{row.gfg.practiceScore}</td>
              <td className="">{row.gfg.count}</td>
              <td className="">{displayHandle(row.leetcode.handle)}</td>
              <td className="">{row.leetcode.rating}</td>
              <td className="">{row.leetcode.count}</td>
              <td className="">{displayHandle(row.codechef.handle)}</td>
              <td className="">{row.codechef.practiceScore}</td>
              <td className="">{row.codechef.count}</td>
              <td className="">{displayHandle(row.hackerRank.handle)}</td>
              <td className="">{row.hackerRank.practiceScore}</td>
              <td className="">{row.percentile}</td>
            </tr>
          ) : (
            <tr key={index} className="whitespace-nowrap text-center">
              <td className=" px-4 py-5">{row.serial}</td>
              <td className=" ">{row.rollNumber}</td>
              <td className="">{row.codeforces.rating}</td>
              <td className="">{row.gfg.contestScore}</td>
              <td className="">{row.leetcode.rating}</td>
              <td className="">{row.codechef.practiceScore}</td>
              <td className="">{row.hackerRank.practiceScore}</td>
              <td className="">{row.percentile}</td>
            </tr>
          )
        )}
      </tbody>
    </>
  );
};

export default StudentData;
