import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="text-8xl font-bold text-zinc-600 mb-4 animate-pulse">
            404
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full animate-pulse"></div>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-zinc-100">
          Page Not Found
        </h1>
        <p className="text-zinc-400 mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist. It might have been
          moved, deleted, or you entered the wrong URL.
        </p>
        <div className="mt-8 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
          <p className="text-sm text-zinc-400">
            Redirecting to home page in
            <span className="text-zinc-400 font-semibold">{` ${countdown} `}</span>
            seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
