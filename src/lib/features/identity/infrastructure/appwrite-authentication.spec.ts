import { AppwriteException } from 'appwrite';
import { describe, expect, it, vi } from 'vitest';

import { UNIVERSAL_ERROR_CODES } from '$lib/shared/errors/application-error';

import { IDENTITY_ERROR_CODES } from '../application/identity-error';

import { AppwriteAuthentication, type AccountClient } from './appwrite-authentication';

function createAccount(overrides: Partial<AccountClient> = {}): AccountClient {
	return {
		createEmailToken: vi.fn(async () => ({
			userId: 'returned-user-id',
			phrase: 'green-carrot'
		})),
		createSession: vi.fn(async () => undefined),
		...overrides
	};
}

describe('AppwriteAuthentication', () => {
	it('translates an email-code request and returns only the application DTO', async () => {
		const account = createAccount();
		const authentication = new AppwriteAuthentication(account, () => 'generated-user-id');

		await expect(authentication.requestEmailCode({ email: '  cook@example.com  ' })).resolves.toEqual({
			userId: 'returned-user-id',
			securityPhrase: 'green-carrot'
		});
		expect(account.createEmailToken).toHaveBeenCalledWith({
			userId: 'generated-user-id',
			email: 'cook@example.com',
			phrase: true
		});
	});

	it('translates the application verification code to an Appwrite secret', async () => {
		const account = createAccount();
		const authentication = new AppwriteAuthentication(account);

		await expect(authentication.verifyEmailCode({ userId: 'user-id', code: ' 123456 ' })).resolves.toBeUndefined();
		expect(account.createSession).toHaveBeenCalledWith({
			userId: 'user-id',
			secret: '123456'
		});
	});

	it('maps an invalid email-code request to validation failed', async () => {
		const account = createAccount({
			createEmailToken: vi.fn(async () => {
				throw new AppwriteException('Invalid email', 400);
			})
		});
		const authentication = new AppwriteAuthentication(account);

		await expect(authentication.requestEmailCode({ email: 'invalid' })).rejects.toMatchObject({
			code: UNIVERSAL_ERROR_CODES.VALIDATION_FAILED
		});
	});

	it('maps an unknown email-code request failure to the identity request error', async () => {
		const account = createAccount({
			createEmailToken: vi.fn(async () => {
				throw new Error('Network unavailable');
			})
		});
		const authentication = new AppwriteAuthentication(account);

		await expect(authentication.requestEmailCode({ email: 'cook@example.com' })).rejects.toMatchObject({
			code: IDENTITY_ERROR_CODES.CODE_REQUEST_FAILED
		});
	});

	it('maps a 401 during code verification to invalid code', async () => {
		const account = createAccount({
			createSession: vi.fn(async () => {
				throw new AppwriteException('Invalid token', 401);
			})
		});
		const authentication = new AppwriteAuthentication(account);

		await expect(authentication.verifyEmailCode({ userId: 'user-id', code: '000000' })).rejects.toMatchObject({
			code: IDENTITY_ERROR_CODES.INVALID_CODE
		});
	});

	it('maps malformed code verification input to validation failed', async () => {
		const account = createAccount({
			createSession: vi.fn(async () => {
				throw new AppwriteException('Invalid request', 400);
			})
		});
		const authentication = new AppwriteAuthentication(account);

		await expect(authentication.verifyEmailCode({ userId: 'user-id', code: '' })).rejects.toMatchObject({
			code: UNIVERSAL_ERROR_CODES.VALIDATION_FAILED
		});
	});

	it('maps an unknown verification failure to the identity verification error', async () => {
		const account = createAccount({
			createSession: vi.fn(async () => {
				throw new Error('Network unavailable');
			})
		});
		const authentication = new AppwriteAuthentication(account);

		await expect(authentication.verifyEmailCode({ userId: 'user-id', code: '123456' })).rejects.toMatchObject({
			code: IDENTITY_ERROR_CODES.CODE_VERIFICATION_FAILED
		});
	});

	it('returns no security phrase when Appwrite provides an empty phrase', async () => {
		const account = createAccount({
			createEmailToken: vi.fn(async () => ({
				userId: 'returned-user-id',
				phrase: ''
			}))
		});
		const authentication = new AppwriteAuthentication(account, () => 'generated-user-id');

		await expect(authentication.requestEmailCode({ email: 'cook@example.com' })).resolves.toEqual({
			userId: 'returned-user-id',
			securityPhrase: undefined
		});
	});
});
