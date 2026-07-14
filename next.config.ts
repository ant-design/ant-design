import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  typedRoutes: true,
  allowedDevOrigins: ['127.0.0.1'],
  turbopack: {
    root: process.cwd(),
  },
  images: {
    qualities: [25, 50, 75, 100],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
  },
  async redirects() {
    return [];
  },
  env: {
    //
  },
};

export default nextConfig;
