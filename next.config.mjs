import { createMDX } from 'fumadocs-mdx/next';
import redirects from './redirects.json' with { type: 'json' };

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.1.186'], // dev only, remove if you use localhost
  async redirects() {
    return redirects;
  },
  async rewrites() {
    return [
      {
        source: '/:path*.md',
        destination: '/llms.mdx/:path*.md',
      },
      {
        source: '/:path*.txt',
        destination: '/llms.mdx/:path*.txt',
      },
    ];
  },
};

export default withMDX(config);
