/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication
 * @type {string[]}
 */
export const authRoutes = [
  "/signin",
  "/signup",
  "/verify-email",
  "/forgot-password",
  "/reset-password",
];

/**
 * The prefix for API routes
 * An array of routes that are used for authentication
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/client-dashboard";

export const DEFAULT_SIGNUP_REDIRECT = "/auth/signin";
