import createNextIntlPlugin from 'next-intl/plugin';

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
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '54321',
      },
    ],
  },
  reactStrictMode: true,
  transpilePackages: ['@lockerai/core'],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(config);
