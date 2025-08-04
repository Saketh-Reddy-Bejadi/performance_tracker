import React from "react";

const FeedbackPopup = ({ showFeedbackPopup, setShowFeedbackPopup }) => {
  return (
    <div>
      {showFeedbackPopup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-black border border-zinc-800 rounded-lg p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-orange-800 text-lg font-semibold">
                Feedback & Suggestions
              </h3>
              <button
                onClick={() => setShowFeedbackPopup(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="text-zinc-300 mb-4">
              We value your feedback! Help us improve this platform by sharing
              your insights, suggesting new features, or pointing out any issues
              you've encountered.
            </p>
            <div className="space-y-4 mb-6">
              <div className="bg-zinc-900/50 rounded-lg p-4">
                <h4 className="text-yellow-700 font-medium mb-2">
                  What we'd love to hear:
                </h4>
                <ul className="text-zinc-300 text-sm space-y-1">
                  <li>• Your experience using the platform</li>
                  <li>• Features you'd like to see added</li>
                  <li>• Any bugs or issues you've found</li>
                  <li>• Suggestions for improving the UI/UX</li>
                  <li>• Additional data sources you'd like included</li>
                </ul>
              </div>
              
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://forms.gle/RjGZ799orLSLzXws8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-green-900 hover:bg-green-950 text-white rounded transition-colors text-center font-medium"
              >
                📝 Share Feedback
              </a>
              <button
                onClick={() => setShowFeedbackPopup(false)}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-950 text-white rounded transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackPopup;
