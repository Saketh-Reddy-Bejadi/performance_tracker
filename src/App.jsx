import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Leaderboard from "./components/Leaderboard";
import Home from "./components/Home";
import GoogleLogin from "./components/GoogleLogin";
import AuthSuccess from "./components/AuthSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./components/UserProfile";
import AuthCallback from "./components/AuthCallback";
import Dashboard from "./components/Dashboard";
import TotalScoreCalculation from "./components/TotalScoreCalculation";
import NotFound from "./components/NotFound";
import BatchValidator from "./components/BatchValidator";

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/:batch"
            element={
              <BatchValidator>
                <Leaderboard />
              </BatchValidator>
            }
          />
          <Route
            path="/dashboard/:batch"
            element={
              <BatchValidator>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </BatchValidator>
            }
          />
          <Route
            path="/profile/:batch"
            element={
              <BatchValidator>
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              </BatchValidator>
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
          <Route path="/calculation" element={<TotalScoreCalculation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};
export default App;
