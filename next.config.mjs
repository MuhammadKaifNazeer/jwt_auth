/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  middleware: [
    // Match all routes
    '/:path*',
  ],
};

export default nextConfig;
