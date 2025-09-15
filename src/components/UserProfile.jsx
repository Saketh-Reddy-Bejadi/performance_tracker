import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { User, Edit, Save, X, Clock } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { PLATFROMS_DATA } from "../../data/platfromsData";

const UserProfile = () => {
  const { user, token } = useAuth();
  const { batch } = useParams();
  const [profile, setProfile] = useState(null);
  const [restrictions, setRestrictions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [handles, setHandles] = useState({});
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      const date = new Date(timestamp);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const time = date.toLocaleTimeString();
      return `${day}/${month}/${year}, ${time}`;
    } catch {
      return "Invalid timestamp";
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchProfile();
    }
  }, [user, token]);

  const fetchProfile = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      console.log(token, apiUrl);
      const response = await fetch(`${apiUrl}/api/users/${batch}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Profile data received:", data);
        setProfile(data.user);

        // Ensure restrictions data is properly formatted
        if (data.restrictions) {
          console.log("Raw restrictions:", data.restrictions);
          const formattedRestrictions = {
            ...data.restrictions,
            nextHandleUpdate: data.restrictions.nextHandleUpdate
              ? new Date(data.restrictions.nextHandleUpdate)
              : null,
            nextScoreUpdate: data.restrictions.nextScoreUpdate
              ? new Date(data.restrictions.nextScoreUpdate)
              : null,
          };
          console.log("Formatted restrictions:", formattedRestrictions);
          setRestrictions(formattedRestrictions);
        }

        setHandles({
          GeeksForGeeksHandle: data.user.GeeksForGeeksHandle?.handle || "",
          CodeforcesHandle: data.user.CodeforcesHandle?.handle || "",
          LeetCodeHandle: data.user.LeetCodeHandle?.handle || "",
          CodeChefHandle: data.user.CodeChefHandle?.handle || "",
          HackerRankHandle: data.user.HackerRankHandle?.handle || "",
        });
      } else {
        setError("Failed to fetch profile");
      }
    } catch (error) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateHandles = async () => {
    setUpdating(true);
    setError("");
    setSuccess("");

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(
        `${apiUrl}/api/users/${batch}/update-handles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ handles }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuccess("Handles updated successfully!");
        setEditing(false);
        fetchProfile(); // Refresh profile data
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update handles");
      }
    } catch (error) {
      setError("Network error");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setError("");
    setSuccess("");
    // Reset handles to current values
    if (profile) {
      setHandles({
        GeeksForGeeksHandle: profile.GeeksForGeeksHandle?.handle || "",
        CodeforcesHandle: profile.CodeforcesHandle?.handle || "",
        LeetCodeHandle: profile.LeetCodeHandle?.handle || "",
        CodeChefHandle: profile.CodeChefHandle?.handle || "",
        HackerRankHandle: profile.HackerRankHandle?.handle || "",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-red-500 mb-4">Failed to load profile</p>
          <button
            onClick={fetchProfile}
            className="cursor-pointer bg-zinc-900 px-5 xl:py-2 py-1 rounded-lg hover:bg-zinc-950 transition-all duration-300 border border-zinc-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <Navbar />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-5">
        <div className="max-w-4xl mx-auto px-4 mt-20">
          {/* Header */}
          <div className="backdrop-blur-sm bg-black/30 border border-zinc-800/50 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                {profile.picture ? (
                  <img
                    src={profile.picture}
                    alt={`Profile picture of ${profile.name || profile.Handle}`}
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-zinc-500" />
                  </div>
                )}
                <div>
                  <h1 className="text-xl font-bold text-white">
                    {profile.name || profile.Handle}
                  </h1>
                  <p className="text-zinc-400 text-sm">{profile.email}</p>
                  <p className="text-sm text-zinc-500">
                    Roll Number: {profile.Handle}
                  </p>
                </div>
              </div>
            </div>

            {/* Restrictions Info */}
            {restrictions && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-zinc-500" />
                  <span className="text-sm text-zinc-400">
                    Handle updates:{" "}
                    {restrictions.canUpdateHandles === true
                      ? "Available"
                      : restrictions.canUpdateHandles === false
                      ? "Cooldown active"
                      : "Unknown"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-zinc-500" />
                  <span className="text-sm text-zinc-400">
                    Score updates:{" "}
                    {restrictions.canUpdateScores === true
                      ? "Available"
                      : restrictions.canUpdateScores === false
                      ? "Cooldown active"
                      : "Unknown"}
                  </span>
                </div>
                {restrictions.nextHandleUpdate && (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-zinc-500" />
                    <span className="text-sm text-zinc-400">
                      Next handle update:{" "}
                      {formatTimestamp(restrictions.nextHandleUpdate)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Handles Section */}
          <div className="backdrop-blur-sm bg-black/30 border border-zinc-800/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">
                Manage Coding Platform Handles
              </h2>
              {!editing && restrictions?.canUpdateHandles === true && (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-1 cursor-pointer bg-zinc-900 px-5 xl:py-2 py-2 rounded-lg hover:bg-zinc-950 transition-all duration-300 border border-zinc-800"
                >
                  <Edit className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit Handles</span>
                  <span className="inline sm:hidden">Edit</span>
                </button>
              )}
              {editing && (
                <div className="flex items-center gap-2 flex-col xl:flex-row p-2">
                  <button
                    onClick={handleUpdateHandles}
                    disabled={updating}
                    className="flex items-center justify-center gap-1 cursor-pointer bg-zinc-900 px-5 xl:py-2 py-1 rounded-lg hover:bg-zinc-950 transition-all duration-300 border border-zinc-800 w-28"
                  >
                    <Save className="w-4 h-4" />
                    <span>{updating ? "Updating..." : "Save"}</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 cursor-pointer bg-zinc-900 px-5 xl:py-2 py-1 rounded-lg hover:bg-zinc-950 transition-all duration-300 border border-zinc-800"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-900/50 border border-green-700 text-green-300 px-4 py-3 rounded-md mb-4">
                {success}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {PLATFROMS_DATA.map((platform) => (
                <div
                  key={platform.key}
                  className="p-2 rounded-2xl bg-zinc-800/15 shadow-md border border-zinc-200/10 hover:shadow-xl hover:border-zinc-300/20 hover:scale-105 transition-transform duration-300 ease-out cursor-pointer flex items-center justify-evenly gap-2"
                >
                  <div className="flex items-center justify-between">
                    {/* Platform Logo */}
                    <div className="">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-800/40 group-hover:bg-zinc-700/50 transition">
                        <img
                          src={platform.icon}
                          alt={platform.name}
                          className="w-6 h-6 invert"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Input / Handle */}
                  {editing ? (
                    <input
                      type="text"
                      value={handles[platform.key] || ""}
                      onChange={(e) =>
                        setHandles((prev) => ({
                          ...prev,
                          [platform.key]: e.target.value,
                        }))
                      }
                      placeholder={`Enter ${platform.name} handle`}
                      className="w-full px-3 py-2 border border-zinc-700/30 rounded-lg text-white placeholder:text-zinc-400 focus:outline-none transition"
                    />
                  ) : (
                    <p className="text-zinc-300 font-medium">
                      {profile[platform.key]?.handle || "Not set"}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {restrictions?.canUpdateHandles === false && (
              <div className="mt-4 p-4 bg-yellow-900/50 border border-yellow-700 rounded-md">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-300">
                    Handle updates are on cooldown. You can update again on{" "}
                    {formatTimestamp(restrictions.nextHandleUpdate)}.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;