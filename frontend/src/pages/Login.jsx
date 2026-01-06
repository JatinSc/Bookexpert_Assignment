import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authApi";

/**
 * =========================
 * LOGIN PAGE
 * =========================
 *
 * Responsibilities of this component:
 * - Collect user credentials (email & password)
 * - Call login API
 * - Handle success & error states
 * - Redirect user after successful login
 *
 * IMPORTANT DESIGN DECISION:
 * - Authentication logic is NOT written here
 * - This component only consumes authApi
 * - Keeps UI clean and testable
 */

const Login = () => {
  /**
   * Local state for form fields
   * ----------------------------
   * Controlled inputs are used so:
   * - We can validate inputs
   * - We can easily reset form
   */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * UI state for better UX
   */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Navigation hook from React Router
   * ---------------------------------
   * Used to redirect user after login
   */
  const navigate = useNavigate();

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    /**
     * Basic frontend validation
     * -------------------------
     * We do NOT rely only on backend checks.
     * This improves UX by giving instant feedback.
     */
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      /**
       * Call login API
       * --------------
       * This will:
       * - Validate credentials (mock)
       * - Generate fake JWT
       * - Store token in localStorage
       */
      await loginUser({ email, password });

      /**
       * Redirect user after successful login
       * ------------------------------------
       * Dashboard is protected by ProtectedRoute,
       * so only authenticated users can reach it.
       */
      navigate("/dashboard");
    } catch (err) {
      /**
       * Handle login errors gracefully
       * -------------------------------
       * Error message comes from authApi
       */
      setError(err.message || "Login failed");
    } finally {
      /**
       * Stop loading indicator
       */
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Card container */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to BookExpert
        </h2>

        {/* Error Message */}
        {error && (
          <p className="mb-4 text-sm text-red-600 text-center">
            {error}
          </p>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@bookexpert.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-medium ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Redirect */}
        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
