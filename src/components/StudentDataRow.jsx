const StudentDataRow = ({ row, showDetails, rowColor, getPlatformColor, displayHandle }) => {
  return showDetails ? (
    <tr className={`whitespace-nowrap text-center ${rowColor}`}>
      <td className="px-4 py-5">{row.serial}</td>
      <td>{row.rollNumber}</td>

      <td className={getPlatformColor(row.codeforces, "codeforces")}>
        {displayHandle(row.codeforces.handle)}
      </td>
      <td className={getPlatformColor(row.codeforces, "codeforces")}>
        {row.codeforces.rating}
      </td>
      <td className={getPlatformColor(row.codeforces, "codeforces")}>
        {row.codeforces.count}
      </td>

      <td className={getPlatformColor(row.gfg, "gfg")}>
        {displayHandle(row.gfg.handle)}
      </td>
      <td className={getPlatformColor(row.gfg, "gfg")}>{row.gfg.contestScore}</td>
      <td className={getPlatformColor(row.gfg, "gfg")}>{row.gfg.practiceScore}</td>
      <td className={getPlatformColor(row.gfg, "gfg")}>{row.gfg.count}</td>

      <td className={getPlatformColor(row.leetcode, "leetcode")}>
        {displayHandle(row.leetcode.handle)}
      </td>
      <td className={getPlatformColor(row.leetcode, "leetcode")}>
        {row.leetcode.rating}
      </td>
      <td className={getPlatformColor(row.leetcode, "leetcode")}>
        {row.leetcode.count}
      </td>

      <td className={getPlatformColor(row.codechef, "codechef")}>
        {displayHandle(row.codechef.handle)}
      </td>
      <td className={getPlatformColor(row.codechef, "codechef")}>
        {row.codechef.practiceScore}
      </td>
      <td className={getPlatformColor(row.codechef, "codechef")}>
        {row.codechef.count}
      </td>

      <td className={getPlatformColor(row.hackerRank, "hackerRank")}>
        {displayHandle(row.hackerRank.handle)}
      </td>
      <td className={getPlatformColor(row.hackerRank, "hackerRank")}>
        {row.hackerRank.practiceScore}
      </td>

      <td>{row.percentile}</td>
    </tr>
  ) : (
    <tr className={`whitespace-nowrap text-center ${rowColor}`}>
      <td className="px-4 py-5">{row.serial}</td>
      <td>{row.rollNumber}</td>
      <td className={getPlatformColor(row.codeforces, "codeforces")}>
        {row.codeforces.rating}
      </td>
      <td className={getPlatformColor(row.gfg, "gfg")}>
        {row.gfg.contestScore}
      </td>
      <td className={getPlatformColor(row.leetcode, "leetcode")}>
        {row.leetcode.rating}
      </td>
      <td className={getPlatformColor(row.codechef, "codechef")}>
        {row.codechef.practiceScore}
      </td>
      <td className={getPlatformColor(row.hackerRank, "hackerRank")}>
        {row.hackerRank.practiceScore}
      </td>
      <td>{row.percentile}</td>
    </tr>
  );
};

export default StudentDataRow;