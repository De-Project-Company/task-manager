/**
 * An array of routes that are used for authentication
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/signin",
  "/auth/signup",
  "/auth/forgotpassword",
  "/auth/reset",
  "/error",
  "/not-found",
];

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/", ...authRoutes, "/about", "/request"];

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
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

/**
 * The default redirect after signup
 * @type {string}
 */
export const DEFAULT_SIGNUP_REDIRECT = "/auth/signin";

/**
 * The default redirect when user is not authenticated
 * @type {string}
 */
export const DEFAULT_REVALIDATE_REDIRECT = "/auth/signin";

/**
 * The array of routes that are protected (require authentication)
 * @type {string[]}
 */
export const protectedRoutes = [
  "/create-project",
  ...[DEFAULT_LOGIN_REDIRECT],
  "/projects:path",
];
