import React from "react";
import StudentDataRow from "./StudentDataRow";

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
        return (
          <StudentDataRow
            key={index}
            row={row}
            showDetails={showDetails}
            rowColor={rowColor}
            getPlatformColor={getPlatformColor}
            displayHandle={displayHandle}
          />
        );
      })}
    </tbody>
    </>
  );
};

export default StudentData;
