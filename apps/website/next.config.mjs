/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'qqxrhrpybdpxlwirjhaw.supabase.co',
      },
    ],
  },
  reactStrictMode: true,
  transpilePackages: ['@lockerai/core'],
};

export default config;
