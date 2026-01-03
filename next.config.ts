import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.in',
      },
    ],
  },
  // Ensure trailing slashes are handled consistently
  trailingSlash: false,
  // Disable strict mode for production if causing issues
  reactStrictMode: true,
};

export default nextConfig;
