import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
  },
});

export const fetchUsers = async (batch) => {
  try {
    const response = await api.get(`/api/users/${batch}`);
    return response.data.users || [];
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

export const sendOtp = (batch, email) =>
  api.post(`/api/users/${batch}/send-otp`, { email });
export const verifyOtp = (batch, email, otp) =>
  api.post(`/api/users/${batch}/verify-otp`, { email, otp });
export const updateHandles = (batch, email, handles) =>
  api.post(`/api/users/${batch}/update-handles`, { email, handles });
export const verifyToken = (token, batch) =>
  api.post("/api/verify-token", { token, batch });

export const transformUserData = (users) => {
  return users.map((user) => ({
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
    percentile: `${Number((user.percentile || 0).toFixed(2))}%`,
  }));
};
