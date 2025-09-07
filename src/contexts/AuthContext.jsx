import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(true);
  const [batch, setBatch] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          setUser(decoded);
          setBatch(decoded.batch);
        } else {
          // Token expired
          localStorage.removeItem("authToken");
          setToken(null);
          setUser(null);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("authToken");
        setToken(null);
        setUser(null);
      }
    }
    setLoading(false);
  }, [token]);

  const login = (newToken, newBatch) => {
    try {
      const decoded = jwtDecode(newToken);
      setToken(newToken);
      setUser(decoded);
      setBatch(newBatch);
      localStorage.setItem("authToken", newToken);
      return true;
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");

    setToken(null);
    setUser(null);
    setBatch(null);
    setLoading(false);
  };

  const updateToken = (newToken) => {
    try {
      const decoded = jwtDecode(newToken);
      setToken(newToken);
      setUser(decoded);
      localStorage.setItem("authToken", newToken);
      return true;
    } catch (error) {
      console.error("Error updating token:", error);
      return false;
    }
  };

  const refreshToken = async () => {
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const apiUrl =
        import.meta.env.VITE_API_BASE_URL;

      if (!apiUrl) {
        console.error("API URL not configured");
        return false;
      }

      const response = await fetch(
        `${apiUrl}/api/auth/${decoded.batch}/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ refreshToken: token }),
        }
      );

      if (response.ok) {
        const { token: newToken } = await response.json();
        return updateToken(newToken);
      }
      return false;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return false;
    }
  };

  const isAuthenticated = () => {
    const hasUser = !!user;
    const hasToken = !!token;

    return hasUser && hasToken;
  };

  const canUpdateHandles = () => {
    // This will be updated when we fetch user restrictions
    return true;
  };

  const canUpdateScores = () => {
    // This will be updated when we fetch user restrictions
    return true;
  };

  const value = {
    user,
    token,
    batch,
    loading,
    login,
    logout,
    updateToken,
    refreshToken,
    isAuthenticated,
    canUpdateHandles,
    canUpdateScores,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
