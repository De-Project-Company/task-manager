/**
 * An array of routes that are used for authentication
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/signin",
  "/auth/signup",
  "/auth/forgetpassword",
  "/auth/reset",
];

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/"];

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
 * The default redirect when user is not authenticated
 * @type {string}
 */
export const DEFAULT_ACCEPTPROJECT_ROUTE = "/project/accept";

/**
 * The array of routes that are protected (require authentication)
 * @type {string[]}
 */
export const protectedRoutes = [
  "/create-project",
  ...[DEFAULT_LOGIN_REDIRECT],
  "/projects/details",
  "/projects/task",
  "/chat",
  "/calender",
  "/project/approve",
  "/notification",
  "/totalProject",
  "/meetings",
  "/new"
];
