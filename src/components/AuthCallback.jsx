import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth(); // Only login needed for this simplified version
  const [status, setStatus] = useState("processing"); // 'processing', 'success', 'error'
  const [message, setMessage] = useState("Processing authentication...");
  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");
    const batch = searchParams.get("batch");
    const errorParam = searchParams.get("error");

    if (hasProcessed) return;

    if (errorParam) {
      setStatus("error");
      try {
        const errorData = JSON.parse(decodeURIComponent(errorParam));
        setMessage(errorData.message || "An unknown error occurred.");
      } catch (e) {
        setMessage(decodeURIComponent(errorParam));
      }
      setHasProcessed(true);
      return;
    }

    if (token && batch) {
      try {
        setHasProcessed(true);
        if (login(token, batch)) {
          setStatus("success");
          setMessage("Authentication successful! Redirecting...");
          setTimeout(() => {
            navigate(`/profile/${batch}`);
          }, 1500);
        } else {
          setStatus("error");
          setMessage("Login failed. Please try again.");
        }
      } catch (error) {
        console.error("Login error:", error);
        setStatus("error");
        setMessage("An unexpected error occurred during login.");
      }
    } else {
      setStatus("error");
      setMessage("Missing authentication parameters. Please try logging in again.");
      setHasProcessed(true);
    }
  }, [searchParams, navigate, hasProcessed]); // Added hasProcessed to dependencies

  if (status === "processing") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Processing Authentication</h2>
          <p>{message}</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Authentication Failed</h2>
          <p>{message}</p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Authentication Successful!</h2>
          <p>{message}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthCallback;