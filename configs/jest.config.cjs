module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(test).ts?(x)', '**/?(*.)+(spec).ts?(x)'],
    moduleNameMapper: {
        "^lodash-es$": "lodash"
    }
};
