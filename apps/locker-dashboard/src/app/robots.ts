import { getBaseUrl } from '@lockerai/core/util/get-base-url';
import type { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: ['/api', '/_next'],
  },
  sitemap: `${getBaseUrl({ app: 'locker-dashboard' }).toString()}/sitemap.xml`,
});

export default robots;
