import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        remotePatterns: [
            { hostname: 'lh3.googleusercontent.com' },
            { hostname: 'ui-avatars.com' },
        ]
    },
}




export default nextConfig;