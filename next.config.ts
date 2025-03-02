import { API_URL } from './src/api';
import type { NextConfig } from 'next';

const config: NextConfig = {
  eslint: { ignoreDuringBuilds: true, dirs: ['src'] },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/search',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: new URL(API_URL).host,
      },
    ],
  },
};

export default config;
