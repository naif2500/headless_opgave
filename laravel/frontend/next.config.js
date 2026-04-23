/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL: 'http://localhost:8000',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
