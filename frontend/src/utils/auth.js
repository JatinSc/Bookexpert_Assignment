/**
 * =========================
 * AUTH UTILITY FUNCTIONS
 * =========================
 * These helpers isolate authentication logic
 * so components stay clean and readable.
 */

/**
 * Check if user is authenticated
 * --------------------------------
 * Decision:
 * - We ONLY check token presence
 * - We do NOT validate JWT signature
 *
 * WHY?
 * - JSON Server cannot validate tokens
 * - In real apps, backend validates JWT
 * - Frontend only checks existence/expiry
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  // Boolean conversion:
  // - token exists → true
  // - token null → false
  return !!token;
};

/**
 * Get decoded user info from token
 * --------------------------------
 * Token was created using btoa(JSON.stringify(...))
 * so we reverse it using atob()
 *
 * This is ONLY for UI-level usage
 * (e.g. showing logged-in user's email)
 */
export const getUserFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    // Decode base64 → string → object
    return JSON.parse(atob(token));
  } catch (error) {
    // If token is corrupted, logout user
    localStorage.removeItem("token");
    return null;
  }
};
