import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const authState = isAuthenticated();

  return (
    <nav className="w-full fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-black/30 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto h-16 flex items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center hover:opacity-80 transition-opacity duration-300"
        >
          <img
            src="/Codetrackr.svg"
            className="h-10 mr-2"
            alt="CodeTrackr Logo"
          />
          <h1 className="text-xl font-semibold tracking-wider">CodeTrackr</h1>
        </Link>
        <div className="flex items-center space-x-3">
          {authState ? (
            <>
              {/* <Link to={`/performance/${user.batch}`}>
                <button className="flex items-center gap-1 cursor-pointer bg-zinc-900 px-5 xl:py-2 py-1 rounded-lg hover:bg-zinc-950 transition-all duration-300 border border-zinc-800">
                  <LayoutDashboard size={18} />
                  <span className="hidden sm:inline">Dashboard</span>
                </button>
              </Link> */}
              <Link to={`/profile/${user.batch}`}>
                <button className="flex items-center gap-1 cursor-pointer bg-zinc-900 px-5 xl:py-2 py-1 rounded-lg hover:bg-zinc-950 transition-all duration-300 border border-zinc-800">
                  <User size={18} />
                  <span className="hidden sm:inline">Profile</span>
                </button>
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1 cursor-pointer bg-zinc-900 px-5 xl:py-2 py-1 rounded-lg hover:bg-zinc-950 transition-all duration-300 border border-zinc-800"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to={`/login`}>
                <button className="cursor-pointer bg-zinc-900 px-5 xl:py-2 py-1 rounded-lg hover:bg-zinc-950 transition-all duration-300 border border-zinc-800">
                  <span className="hidden sm:inline">Login</span>
                  <span className="inline sm:hidden">Login</span>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
