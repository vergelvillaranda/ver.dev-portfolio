import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep dev and production artifacts isolated to avoid manifest temp-file races.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
};

export default nextConfig;
