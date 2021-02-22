import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testTimeout: 30000,
	testMatch: ['**/tests/**/*.test.ts'],
	collectCoverage: true,
	coverageDirectory: 'coverage',
	verbose: true,
	watchPathIgnorePatterns: [
		'<rootDir>/@types/',
		'<rootDir>/config/',
		'<rootDir>/coverage/',
		'<rootDir>/\\.platform/',
		'<rootDir>/\\.git/',
		'<rootDir>/node_modules/',
		'<rootDir>\\/[^\\/]+?$'
	]
};

export default config;
