/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
};

export default {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};
