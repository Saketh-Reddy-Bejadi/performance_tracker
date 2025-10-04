import React, { useEffect, useState } from "react";

const TopLoader = ({ isVisible }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let interval;

    if (isVisible) {
      setVisible(true);
      setProgress(0);

      // Gradual, smooth fake loading effect
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) return prev + Math.random() * 8;
          return prev;
        });
      }, 180);
    } else if (!isVisible && visible) {
      // Finish and fade out
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 600);
    }

    return () => clearInterval(interval);
  }, [isVisible, visible]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-[9999] overflow-hidden">
      {/* Metallic gradient loader */}
      <div
        className="absolute top-0 left-0 h-full rounded-r-full shadow-[0_0_8px_rgba(255,255,255,0.25)]"
        style={{
          width: `${progress}%`,
          background:
            "linear-gradient(90deg, #3f3f46 0%, #a1a1aa 40%, #d4d4d8 80%, #71717a 100%)",
          transition: "width 0.35s ease-out, opacity 0.6s ease-out",
          opacity: progress >= 100 ? 0 : 1,
        }}
      ></div>

      {/* Moving shimmer line */}
      <div
        className="absolute top-0 h-full w-[15%] opacity-40"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          left: `${progress - 20}%`,
          animation: "shimmerMove 1.5s linear infinite",
        }}
      ></div>

      <style>{`
        @keyframes shimmerMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(600%); }
        }
      `}</style>
    </div>
  );
};

export default TopLoader;