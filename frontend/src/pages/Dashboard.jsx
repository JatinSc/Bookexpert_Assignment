import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";
import { logoutUser } from "../services/authApi";

/**
 * =========================
 * DASHBOARD PAGE
 * =========================
 *
 * This is a protected page.
 * Access is controlled via <ProtectedRoute />
 *
 * Responsibilities:
 * - Show logged-in user information
 * - Provide logout functionality
 * - Act as entry point for app features
 */

const Dashboard = () => {
  /**
   * Extract user info from token
   * ----------------------------
   * We decode token ONLY for UI usage
   * (e.g. display email)
   *
   * In real apps:
   * - Token decoding/verification happens on backend
   */
  const user = getUserFromToken();

  /**
   * Navigation hook
   */
  const navigate = useNavigate();

  /**
   * Handle logout
   */
  const handleLogout = () => {
    /**
     * Clear authentication token
     * ---------------------------
     * This immediately logs out user
     */
    logoutUser();

    /**
     * Redirect to login page
     * ----------------------
     * PublicRoute will now allow access
     */
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Employee Management Dashboard
        </h1>

        <div className="flex items-center gap-4">
          {/* Display logged-in user email */}
          <span className="text-sm text-gray-600">
            {user?.email}
          </span>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Placeholder content */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">
            Welcome to BookExpert
          </h2>
          <p className="text-gray-600">
            This dashboard will allow you to manage employees,
            view statistics, and perform CRUD operations.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
