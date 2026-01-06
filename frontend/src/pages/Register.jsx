import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authApi";

/**
 * =========================
 * REGISTER PAGE
 * =========================
 *
 * Responsibilities:
 * - Collect user credentials
 * - Register new user
 * - Redirect to login after success
 *
 * IMPORTANT:
 * - Registration logic lives in authApi
 * - This component focuses on UI & UX only
 */

const Register = () => {
  /**
   * Controlled form state
   */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * UI feedback state
   */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /**
   * Navigation hook
   */
  const navigate = useNavigate();

  /**
   * Handle registration
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    /**
     * Frontend validation
     */
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      /**
       * Call register API
       * ------------------
       * This will:
       * - Check for duplicate users
       * - Save user in JSON Server
       */
      await registerUser({ email, password });

      /**
       * UX decision:
       * - Show success message briefly
       * - Redirect to login page
       */
      setSuccess("Registration successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      /**
       * Show meaningful error
       */
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </h2>

        {/* Error Message */}
        {error && (
          <p className="mb-4 text-sm text-red-600 text-center">
            {error}
          </p>
        )}

        {/* Success Message */}
        {success && (
          <p className="mb-4 text-sm text-green-600 text-center">
            {success}
          </p>
        )}

        {/* Register Form */}
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
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-medium ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login Redirect */}
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
