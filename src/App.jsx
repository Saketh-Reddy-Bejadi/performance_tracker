import { Routes, Route, Navigate } from "react-router-dom";
import LeaderBoardOutline from "./components/LeaderBoardOutline";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/:batch" element={<LeaderBoardOutline />} />
        <Route path="/" element={<Navigate to="/2026" replace />} />
      </Routes>
    </div>
  );
};
export default App;
