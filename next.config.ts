import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Modern formats first; Next falls back automatically for older browsers.
    formats: ["image/avif", "image/webp"],
    // Add a remotePatterns entry here if product imagery moves to a CMS/CDN.
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ["motion"],
  },
};

export default nextConfig;
