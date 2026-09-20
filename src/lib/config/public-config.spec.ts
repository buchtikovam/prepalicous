import { describe, expect, it } from 'vitest';

import { parsePublicConfig } from './public-config';

const validEnvironment: Record<string, string | undefined> = {
	PUBLIC_APP_NAME: 'Prepalicious',
	PUBLIC_APPWRITE_ENDPOINT: 'https://fra.cloud.appwrite.io/v1',
	PUBLIC_APPWRITE_PROJECT_ID: 'project-id',
	PUBLIC_APPWRITE_DATABASE_ID: 'database-id'
};

const requiredVariables = [
	'PUBLIC_APP_NAME',
	'PUBLIC_APPWRITE_ENDPOINT',
	'PUBLIC_APPWRITE_PROJECT_ID',
	'PUBLIC_APPWRITE_DATABASE_ID'
] as const;

describe('parsePublicConfig', () => {
	it('returns trimmed, typed public configuration', () => {
		expect(
			parsePublicConfig({
				...validEnvironment,
				PUBLIC_APP_NAME: '  Prepalicious  ',
				PUBLIC_APPWRITE_PROJECT_ID: '  project-id  '
			})
		).toEqual({
			appName: 'Prepalicious',
			appwriteEndpoint: 'https://fra.cloud.appwrite.io/v1',
			appwriteProjectId: 'project-id',
			appwriteDatabaseId: 'database-id'
		});
	});

	it.each(requiredVariables)('rejects a missing %s', (name) => {
		expect(() =>
			parsePublicConfig({
				...validEnvironment,
				[name]: undefined
			})
		).toThrow(`${name} is required`);
	});

	it.each(requiredVariables)('rejects a blank %s', (name) => {
		expect(() =>
			parsePublicConfig({
				...validEnvironment,
				[name]: '   '
			})
		).toThrow(`${name} is required`);
	});

	it('rejects a malformed Appwrite endpoint', () => {
		expect(() =>
			parsePublicConfig({
				...validEnvironment,
				PUBLIC_APPWRITE_ENDPOINT: 'not a URL'
			})
		).toThrow('PUBLIC_APPWRITE_ENDPOINT must be a valid URL');
	});
});
