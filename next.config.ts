import type { NextConfig } from 'next';

const config: NextConfig = {
  eslint: { ignoreDuringBuilds: true, dirs: ['src'] },
  reactStrictMode: true,
};

export default config;
