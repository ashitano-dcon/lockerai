/** @type {(overrideConfig: import('jest').Config) => Promise<import('jest').Config>} */
const createConfig = require('@lockerai/jest/jest.nextjs.cjs');

module.exports = createConfig({
  moduleNameMapper: {
    '^~website/(.*)$': '<rootDir>/$1',
    '^#website/(.*)$': '<rootDir>/src/$1',
    '^#core/(.*)$': '<rootDir>/../../packages/core/$1',
  },
});
