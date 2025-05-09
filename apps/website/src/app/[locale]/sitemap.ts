import { getBaseUrl } from '@lockerai/core/util/get-base-url';
import type { MetadataRoute } from 'next';

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: getBaseUrl({ app: 'website' }).toString(),
    lastModified: new Date(),
  },
];

export default sitemap;
