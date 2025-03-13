/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './'
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text', 'text-summary'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleFileExtensions: ['tsx', 'ts', 'jsx', 'js', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testPathIgnorePatterns: ['<rootDir>/src/components/ui/'],
  modulePathIgnorePatterns: ['<rootDir>/src/components/ui/'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/components/ui/',
    '.*\\.model\\.ts$',
    '/index\\.ts$',
    '^app/[^/]+\\.(js|jsx|ts|tsx)$'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    'app/components/**/*.{js,jsx,ts,tsx}',
    'app/context/**/*.{js,jsx,ts,tsx}',
    'app/layout/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/components/ui/**/*', // shadcn stuff
    '!**/node_modules/**'
  ]
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
