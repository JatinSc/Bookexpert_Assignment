import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

/**
 * =========================
 * PUBLIC ROUTE COMPONENT
 * =========================
 *
 * Purpose:
 * - Prevent authenticated users from accessing
 *   Login / Register pages
 *
 * Example:
 * <PublicRoute>
 *   <Login />
 * </PublicRoute>
 *
 * If user IS authenticated:
 * → Redirect to dashboard
 */
const PublicRoute = ({ children }) => {
  /**
   * Check authentication status
   */
  const auth = isAuthenticated();

  /**
   * If user is already logged in,
   * redirect them to dashboard
   */
  if (auth) {
    return <Navigate to="/dashboard" replace />;
  }

  /**
   * If user is NOT logged in,
   * allow access to public page
   */
  return children;
};

export default PublicRoute;
