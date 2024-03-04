import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "ui-avatars.com" },
      { hostname: "i.pinimg.com" },
      { hostname: "giphy.com" },
    ],
  },
};

export default nextConfig;
