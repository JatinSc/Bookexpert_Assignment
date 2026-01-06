import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

/**
 * =========================
 * PROTECTED ROUTE COMPONENT
 * =========================
 *
 * This component wraps routes that require authentication.
 *
 * Example usage:
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 *
 * If user is NOT authenticated:
 * → Redirect to login page
 */
const ProtectedRoute = ({ children }) => {
  /**
   * Check authentication status
   */
  const auth = isAuthenticated();

  /**
   * If user is not logged in,
   * prevent access and redirect to login
   */
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  /**
   * If authenticated,
   * render the protected component
   */
  return children;
};

export default ProtectedRoute;
