import { Routes, Route, Navigate } from "react-router-dom";
import LeaderBoardOutline from "./components/LeaderBoardOutline";
import HandleUpdate from "./components/HandleUpdate";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/:batch" element={<LeaderBoardOutline />} />
        <Route path="/update-handles" element={<HandleUpdate />} />
        <Route path="/" element={<Navigate to="/2026" replace />} />
      </Routes>
    </div>
  );
};
export default App;
