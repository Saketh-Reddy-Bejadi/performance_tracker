import React from "react";

const StudentData = ({ data, showDetails }) => {
  const isPlatformAllZero = (platform, platformName) => {
    if (showDetails) {
      const hasHandle =
        platform.handle &&
        platform.handle.trim() !== "" &&
        platform.handle !== "#n/a";
      const hasValue =
        platform.rating > 0 ||
        platform.practiceScore > 0 ||
        platform.contestScore > 0;

      if (platformName === "hackerRank") {
        return !hasHandle && !hasValue;
      } else {
        return !hasHandle && !hasValue && !(platform.count > 0);
      }
    } else {
      const hasValue =
        platform.rating > 0 ||
        platform.practiceScore > 0 ||
        platform.contestScore > 0;
      return !hasValue;
    }
  };

  const isPlatformAnyZero = (platform, platformName) => {
    if (showDetails) {
      const hasHandle =
        platform.handle &&
        platform.handle.trim() !== "" &&
        platform.handle !== "#n/a";
      const hasValue =
        platform.rating > 0 ||
        platform.practiceScore > 0 ||
        platform.contestScore > 0;

      if (platformName === "hackerRank") {
        return !hasHandle || !hasValue;
      } else {
        return !hasHandle || !hasValue || !(platform.count > 0);
      }
    } else {
      const hasValue =
        platform.rating > 0 ||
        platform.practiceScore > 0 ||
        platform.contestScore > 0;
      return !hasValue;
    }
  };

  const getRowColor = (row) => {
    const platforms = [
      { name: "codeforces", data: row.codeforces },
      { name: "gfg", data: row.gfg },
      { name: "leetcode", data: row.leetcode },
      { name: "codechef", data: row.codechef },
      { name: "hackerRank", data: row.hackerRank },
    ];

    const hasRedPlatform = platforms.some((p) =>
      isPlatformAllZero(p.data, p.name)
    );
    const hasOrangePlatform = platforms.some(
      (p) =>
        isPlatformAnyZero(p.data, p.name) && !isPlatformAllZero(p.data, p.name)
    );

    if (hasRedPlatform) return "text-red-500";
    if (hasOrangePlatform) return "text-orange-500";
    return "text-white";
  };

  const getPlatformColor = (platform, platformName) => {
    if (isPlatformAllZero(platform, platformName)) return "text-red-500";
    if (isPlatformAnyZero(platform, platformName)) return "text-orange-500";
    return "text-white";
  };

  const displayHandle = (handle) => {
    if (!handle || handle.trim() === "" || handle === "#n/a") {
      return <span className="text-red-500">#n/a</span>;
    }
    return handle;
  };

  return (
    <>
      <tbody>
        {data.map((row, index) => {
          const rowColor = getRowColor(row);

          return showDetails ? (
            <tr
              key={index}
              className={`whitespace-nowrap text-center ${rowColor}`}
            >
              <td className="px-4 py-5">{row.serial}</td>
              <td className="">{row.rollNumber}</td>
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
              <td className={getPlatformColor(row.gfg, "gfg")}>
                {row.gfg.contestScore}
              </td>
              <td className={getPlatformColor(row.gfg, "gfg")}>
                {row.gfg.practiceScore}
              </td>
              <td className={getPlatformColor(row.gfg, "gfg")}>
                {row.gfg.count}
              </td>
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
              <td className="">{row.percentile}</td>
            </tr>
          ) : (
            <tr
              key={index}
              className={`whitespace-nowrap text-center ${rowColor}`}
            >
              <td className="px-4 py-5">{row.serial}</td>
              <td className="">{row.rollNumber}</td>
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
              <td className="">{row.percentile}</td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
};

export default StudentData;
