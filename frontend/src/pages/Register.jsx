import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authApi";
import { Mail, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required");
      toast.error("Email and password are required");
      return;
    }
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await registerUser({ email, password });
      setSuccess("Registration successful. Redirecting to login...");
      toast.success("Registration successful");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      const msg = err.message || "Registration failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen relative bg-[#0f172a] flex items-center justify-center text-gray-100 overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/30 blur-[120px]" />
        <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] rounded-full bg-indigo-900/20 blur-[150px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-pink-900/20 blur-[100px]" />
      </div>
      <div className="relative z-10 w-full max-w-md px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center">Create Account</h2>
        <p className="mt-2 text-center text-sm text-gray-300">Enter your details below to get started.</p>
 
        {error && <p className="mt-4 text-sm text-red-400 text-center">{error}</p>}
        {success && <p className="mt-4 text-sm text-green-400 text-center">{success}</p>}
 
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bookexpert.com"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40"
              />
            </div>
          </div>
 
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
 
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-3.5 rounded-2xl text-white font-medium transition ${
              loading ? "bg-blue-600/60 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
            } shadow-lg shadow-blue-900/30`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
 
          <div className="flex items-center gap-4 text-gray-400 text-sm mt-4">
            <span className="flex-1 h-px bg-white/10" />
            <span>Or sign up with</span>
            <span className="flex-1 h-px bg-white/10" />
          </div>
 
          <p className="text-sm text-center mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-300 hover:text-blue-200">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
 
export default Register;
