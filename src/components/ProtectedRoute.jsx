import { Navigate, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children, reverse = false }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();
  const { batch } = useParams();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Reverse case: protect route from authenticated users (e.g., login page)
  if (reverse) {
    if (isAuthenticated()) {
      // User is already logged in, redirect to their profile
      return <Navigate to={`/profile/${user.batch}`} replace />;
    }
    return children;
  }

  // Normal case: protect route for authenticated users only
  if (!isAuthenticated()) {
    // Redirect to login page with the intended destination
    return (
      <Navigate to={`/login`} state={{ from: location }} replace />
    );
  }

  if (user && user.batch !== batch) {
    return <Navigate to={`/${user.batch}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
