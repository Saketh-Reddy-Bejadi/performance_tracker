import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserNotFound = () => {
  const [timer, setTimer] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer === 0) {
      navigate("/login");
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="max-w-md text-center bg-zinc-900/60 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-zinc-700/50">
        <h2 className="text-2xl font-bold mb-4">User Not Found</h2>
        <p className="text-zinc-300 mb-4">
          We could not find a user with the information you provided during
          login.
        </p>

        <p className="text-zinc-400 mb-6">
          This may be due to selecting the wrong batch or using an email that is
          not registered.
        </p>

        <p className="text-zinc-300 mb-6">
          You will be redirected to the login page in{" "}
          <span className="font-semibold">{timer}</span> second
          {timer > 1 ? "s" : ""}.
        </p>
      </div>
    </div>
  );
};

export default UserNotFound;
