import React from "react";
import { DATA_2026 } from "../../data/studentData";

const StudentData = ({data,showDetails}) => {
  return (
    <>
     <tbody>
        {data.map((row, index) => 
        (showDetails?(
          <tr key={index} className="whitespace-nowrap text-center">
            <td className=" px-4 py-5">{index+1}</td>
            <td className=" ">{row.rollNumber}</td>
            <td className="">{row.codeforces.handle}</td>
            <td className="">{row.codeforces.rating}</td>
            <td className="">{row.codeforces.total}</td>
            <td className="">{row.gfg.handle}</td>
            <td className="">{row.gfg.contestScore}</td>
            <td className="">{row.gfg.practiceScore}</td>
            <td className="">{row.gfg.total}</td>
            <td className="">{row.leetcode.handle}</td>
            <td className="">{row.leetcode.rating}</td>
            <td className="">{row.leetcode.total}</td>
            <td className="">{row.codechef.handle}</td>
            <td className="">{row.codechef.practiceScore}</td>
            <td className="">{row.codechef.total}</td>
            <td className="">{row.hackerRank.handle}</td>
            <td className="">{row.hackerRank.practiceScore}</td>
            <td className="">{row.hackerRank.total}</td>
            <td className="">{row.percentile}</td>
          </tr>
        ):(
          <tr key={index} className="whitespace-nowrap text-center">
            <td className=" px-4 py-5">{index+1}</td>
            <td className=" ">{row.rollNumber}</td>
          <td className="">{row.codeforces.total}</td>
          <td className="">{row.gfg.total}</td>
          <td className="">{row.leetcode.total}</td>
          <td className="">{row.codechef.total}</td>
          <td className="">{row.hackerRank.total}</td>
          <td className="">{row.percentile}</td>
          </tr>
        ))
  )}
      </tbody>
    </>
  );
};

export default StudentData;
