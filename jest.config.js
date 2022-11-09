module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/test/**/*',
    '!<rootDir>/src/**/infra/**/*',
    '!<rootDir>/src/**/domain/**/*',
    '!<rootDir>/src/**/presenters/*.module.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/documentation.ts',
    '!<rootDir>/src/main.ts',
    '!<rootDir>/src/shared/presenters/exception-filter.ts',
    '!**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(tsx|ts)?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy',
  },
  testTimeout: 30000,
};
