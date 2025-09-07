import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LeaderBoardOutline from "./components/LeaderBoardOutline";
import Home from "./components/Home";
import GoogleLogin from "./components/GoogleLogin";
import AuthSuccess from "./components/AuthSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./components/UserProfile";
import AuthCallback from "./components/AuthCallback";

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route path="/:batch" element={<LeaderBoardOutline />} />
          <Route
            path="/profile/:batch"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute reverse={true}>
                <GoogleLogin />
              </ProtectedRoute>
            }
          />
          <Route path="/auth-callback" element={<AuthCallback />} />
          <Route path="/auth-success" element={<AuthSuccess />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};
export default App;
