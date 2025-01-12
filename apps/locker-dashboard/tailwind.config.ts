import { createConfig } from '@lockerai/tailwind/config';

const config = createConfig((defaultConfig) => ({
  ...defaultConfig,
  content: ['./src/**/*.{ts,tsx}', '../../packages/**/*.{ts,tsx}'],
}));

export default config;
