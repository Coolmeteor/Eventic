const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Project root path
});

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    },
    transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/src/pages/'
    ]
};

module.exports = createJestConfig(customJestConfig);
