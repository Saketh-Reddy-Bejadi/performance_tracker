import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp, updateHandles } from "../services/api";

const HandleUpdate = () => {
  const navigate = useNavigate();
  const [batch, setBatch] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [handles, setHandles] = useState(null);
  const [step, setStep] = useState("email"); // email, otp, handles
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [initialHandles, setInitialHandles] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  const handleSendOtp = async () => {
    if (!batch) {
      setError("Please select a valid batch.");
      return;
    }
    if (!email.endsWith("@cmrithyderabad.edu.in")) {
      setError("Please enter a valid @cmrithyderabad.edu.in email address.");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await sendOtp(batch, email);
      setMessage(response.data.message);
      setStep("otp");
      setOtpSent(true);
      setTimeout(() => setOtpSent(false), 60000); // 60 second cooldown
    } catch (err) {
      console.log(err);
      setError(`${err.response?.data?.error}(${err.response?.data?.message})`);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await verifyOtp(batch, email, otp);
      setHandles(response.data);
      setInitialHandles(response.data);
      setStep("handles");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "The OTP is invalid or has expired. Please request a new one."
      );
    }
    setLoading(false);
  };

  const handleUpdateHandles = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await updateHandles(batch, email, handles);
      setMessage(response.data.message);
      setTimeout(() => {
        navigate(`/${batch}`);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "An unexpected error occurred.");
    }
    setLoading(false);
  };

  const handleHandleChange = (e) => {
    const { name, value } = e.target;
    const updatedHandles = {
      ...handles,
      [name]: value,
    };
    setHandles(updatedHandles);
    setIsChanged(
      JSON.stringify(updatedHandles) !== JSON.stringify(initialHandles)
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-zinc-800 rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-white text-lg font-semibold mb-6 text-center">
          Update Your Handles
        </h2>
        {error && <p className="text-gray-300 text-center mb-4">{error}</p>}
        {message && <p className="text-gray-300 text-center mb-4">{message}</p>}

        {step === "email" && (
          <div>
            <label
              htmlFor="batch"
              className="block text-sm font-medium text-zinc-400"
            >
              Batch
            </label>
            <select
              id="batch"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border bg-black border-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm text-zinc-300"
            >
              <option value="">Select Batch</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-400 mt-4"
            >
              College Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border bg-black border-zinc-800 rounded-md shadow-sm placeholder-zinc-500 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm text-zinc-300"
              placeholder="2xr01axxxx@cmrithyderabad.edu.in"
            />
            <button
              onClick={handleSendOtp}
              disabled={loading || otpSent}
              className="w-full mt-4 flex justify-center py-2 px-4 border border-zinc-700/50 rounded-md shadow-sm text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-950 transition-all duration-500"
            >
              {loading
                ? "Sending..."
                : otpSent
                ? "Resend OTP in 60s"
                : "Send OTP"}
            </button>
          </div>
        )}

        {step === "otp" && (
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-zinc-400"
            >
              Enter 6-Digit OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border bg-black border-zinc-800 rounded-md shadow-sm placeholder-zinc-500 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm text-zinc-300"
              maxLength="6"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full mt-4 flex justify-center py-2 px-4 border border-zinc-700/50 rounded-md shadow-sm text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-950 transition-all duration-500"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        {step === "handles" && handles && (
          <div>
            {Object.keys(handles).map((handleKey) => (
              <div key={handleKey} className="mb-4">
                <label
                  htmlFor={handleKey}
                  className="block text-sm font-medium text-zinc-400"
                >
                  {handleKey.replace("Handle", "")}
                </label>
                <input
                  type="text"
                  id={handleKey}
                  name={handleKey}
                  value={handles[handleKey]}
                  onChange={handleHandleChange}
                  className="mt-1 block w-full px-3 py-2 border bg-black border-zinc-800 rounded-md shadow-sm placeholder-zinc-500 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm text-zinc-300"
                />
              </div>
            ))}
            <button
              onClick={handleUpdateHandles}
              disabled={loading || !isChanged}
              className={`w-full mt-4 flex justify-center py-2 px-4 border border-zinc-700/50 rounded-md shadow-sm text-sm font-medium transition-all duration-500
    ${
      loading || !isChanged
        ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
        : "bg-zinc-900 text-white hover:bg-zinc-950 cursor-pointer"
    }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HandleUpdate;
