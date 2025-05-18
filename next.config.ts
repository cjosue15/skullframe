import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-bef3afca1bc141e2af506d99b78f265d.r2.dev',
      },
    ],
  },
};

export default nextConfig;
