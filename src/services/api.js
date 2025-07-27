
export const fetchUsers = async () => {
  try {
    const token = import.meta.env.VITE_TOKEN;
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.users || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const transformUserData = (users) => {
  return users.map((user) => ({
    rollNumber: user.Handle,
    codeforces: {
      handle: user.CodeforcesHandle?.handle || "",
      rating: Number((user.CodeforcesHandle?.rating || 0).toFixed(2)),
      count: user.CodeforcesHandle?.contests || 0,
    },
    gfg: {
      handle: user.GFGHandle?.handle || "",
      contestScore: Number((user.GFGHandle?.contestRating || 0).toFixed(2)),
      practiceScore: Number((user.GFGHandle?.codingScore || 0).toFixed(2)),
      count: user.GFGHandle?.contestsAttended || 0,
    },
    leetcode: {
      handle: user.LeetCodeHandle?.handle || "",
      rating: Number((user.LeetCodeHandle?.rating || 0).toFixed(2)),
      count: user.LeetCodeHandle?.contests || 0,
    },
    codechef: {
      handle: user.CodeChefHandle?.handle || "",
      practiceScore: Number((user.CodeChefHandle?.rating || 0).toFixed(2)),
      count: user.CodeChefHandle?.contests || 0,
    },
    hackerRank: {
      handle: user.HackerRankHandle?.handle || "",
      practiceScore: Number((user.HackerRankHandle?.rating || 0).toFixed(2)),
    },
    percentile: `${Number((user.percentile || 0).toFixed(2))}%`,
  }));
};
