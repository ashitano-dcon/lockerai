import { getBaseUrl } from '@lockerai/core/util/get-base-url';
import type { WebApplication, WithContext } from 'schema-dts';

export const jsonLd: WithContext<WebApplication> = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  '@id': getBaseUrl({ app: 'locker-dashboard' }).toString(),
  applicationCategory: ['LifestyleApplication', 'SecurityApplication', 'UtilitiesApplication'],
  applicationSubCategory: ['LostAndFound'],
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  description: 'Locker.ai is a service that uses a unique AI-driven authentication mechanism to safely report and retrieve lost items.',
  featureList: ['Search for lost items', 'Register lost items'],
  genre: ['Lifestyle', 'Security', 'Utilities', 'Lost and Found'],
  image: `${getBaseUrl({ app: 'locker-dashboard' })}/ogp.png`,
  inLanguage: 'en',
  license: 'https://creativecommons.org/licenses/by/4.0',
  maintainer: {
    '@type': 'Organization',
    name: 'NITIC PBL P8',
    url: 'https://github.com/nitic-pbl-p8',
  },
  name: 'Locker.ai',
  offers: {
    '@type': 'Offer',
    price: '0',
  },
  provider: {
    '@type': 'Organization',
    name: 'NITIC PBL P8',
    url: 'https://github.com/nitic-pbl-p8',
  },
  // TODO: Take a screenshot of the /dashboard page and publish it.
  screenshot: '',
  url: getBaseUrl({ app: 'locker-dashboard' }).toString(),
};
