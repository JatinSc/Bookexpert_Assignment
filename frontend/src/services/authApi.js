import apiClient from "./apiClient";

/**
 * ===============================
 * AUTHENTICATION API (MOCK)
 * ===============================
 * IMPORTANT:
 * - JSON Server does NOT support real authentication
 * - Passwords are stored in plain text ONLY for demo purposes
 * - JWT is mocked to demonstrate frontend auth flow
 * - In real apps, ALL of this logic belongs to backend
 */

/**
 * Register a new user
 * POST /users
 */
export const registerUser = async ({ email, password }) => {
  /**
   * STEP 1: Check if user already exists
   * -----------------------------------
   * Since JSON Server has no validation layer,
   * we manually check on the frontend.
   */
  const existingUsers = await apiClient.get(
    `/users?email=${email}`
  );

  if (existingUsers.data.length > 0) {
    // Prevent duplicate registrations
    throw new Error("User already exists");
  }

  /**
   * STEP 2: Save user
   * -----------------
   * Password is stored as plain text.
   * ❗ This is INSECURE in real applications.
   * ✅ Acceptable here because:
   *    - JSON Server is a mock backend
   *    - Assignment focuses on UI & flow
   */
  const response = await apiClient.post("/users", {
    email,
    password,
  });

  return response.data;
};

/**
 * Login user
 * GET /users?email=&password=
 */
export const loginUser = async ({ email, password }) => {
  /**
   * STEP 1: Validate credentials
   * ----------------------------
   * We query users collection using email & password.
   * JSON Server supports query params out of the box.
   */
  const response = await apiClient.get(
    `/users?email=${email}&password=${password}`
  );

  /**
   * STEP 2: Check if user exists
   */
  if (response.data.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = response.data[0];

  /**
   * STEP 3: Generate MOCK JWT token
   * --------------------------------
   * This is NOT a real JWT.
   * Purpose:
   * - Demonstrate how frontend handles auth tokens
   * - Protect routes
   * - Persist login state
   *
   * Real JWTs are generated & verified by backend.
   */
  const fakeJwtToken = btoa(
    JSON.stringify({
      userId: user.id,
      email: user.email,
      issuedAt: Date.now(),
    })
  );

  /**
   * STEP 4: Store token in localStorage
   * -----------------------------------
   * Frontend responsibility:
   * - Store token
   * - Attach token to requests (optional)
   * - Clear token on logout
   */
  localStorage.setItem("token", fakeJwtToken);

  return {
    token: fakeJwtToken,
    user,
  };
};

/**
 * Logout user
 * -----------
 * Clear token from storage
 */
export const logoutUser = () => {
  localStorage.removeItem("token");
};
