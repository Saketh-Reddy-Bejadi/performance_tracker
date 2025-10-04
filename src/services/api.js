import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
  },
});

export const fetchUsers = async (batch, page = 1, limit = 20, search = '') => {
  try {
    const params = { page, limit };
    if (search.trim()) {
      params.search = search.trim();
    }
    
    const response = await api.get(`/api/leaderboard/${batch}`, { params });
    return {
      users: response.data.users || [],
      total: response.data.total || 0,
      hasMore: response.data.hasMore || false,
      totalPages: response.data.totalPages || 1,
      currentPage: response.data.page || 1
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchScrapingStats = async (batch) => {
  try {
    const response = await api.get(`/api/scraping/stats/${batch}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching scraping stats:", error);
    throw error;
  }
};

export const updateHandles = (batch, handles) =>
  api.post(`/api/users/${batch}/update-handles`, { handles });

export const fetchDashboardData = async (batch, token) => {
  try {
    const response = await api.get(`/api/dashboard/${batch}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const transformUserData = (users) => {
  return users.map((user) => ({
    serial:user.rank,
    rollNumber: user.Handle,
    codeforces: {
      handle: user.CodeforcesHandle?.handle || "",
      rating: Number((user.CodeforcesHandle?.rating || 0).toFixed(2)),
      count: user.CodeforcesHandle?.contests || 0,
    },
    gfg: {
      handle: user.GeeksForGeeksHandle?.handle || "",
      contestScore: Number(
        (user.GeeksForGeeksHandle?.contestRating || 0).toFixed(2)
      ),
      practiceScore: Number(
        (user.GeeksForGeeksHandle?.codingScore || 0).toFixed(2)
      ),
      count: user.GeeksForGeeksHandle?.contestsAttended || 0,
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
    percentile: `${Number((user.totalScore || 0).toFixed(2))}`,
    consistency: `${user.consistency || 0}%`,
  }));
};
