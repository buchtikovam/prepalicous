import { Account, AppwriteException, ID } from 'appwrite';

import { appwriteClient } from '$lib/shared/appwrite/client';
import { UNIVERSAL_ERROR_CODES } from '$lib/shared/errors/application-error';

import type {
	Authentication,
	EmailCodeChallenge,
	RequestEmailCodeCommand,
	VerifyEmailCodeCommand
} from '../application/authentication';
import { IDENTITY_ERROR_CODES, IdentityError } from '../application/identity-error';

export type AccountClient = {
	createEmailToken(input: { userId: string; email: string; phrase?: boolean }): Promise<{
		userId: string;
		phrase: string;
	}>;
	createSession(input: { userId: string; secret: string }): Promise<unknown>;
};

export class AppwriteAuthentication implements Authentication {
	constructor(
		private readonly account: AccountClient = new Account(appwriteClient),
		private readonly createId: () => string = ID.unique
	) {}

	async requestEmailCode({ email }: RequestEmailCodeCommand): Promise<EmailCodeChallenge> {
		try {
			const token = await this.account.createEmailToken({
				userId: this.createId(),
				email: email.trim(),
				phrase: true
			});

			return {
				userId: token.userId,
				securityPhrase: token.phrase || undefined
			};
		} catch (cause) {
			if (cause instanceof AppwriteException && cause.code === 400) {
				throw new IdentityError(UNIVERSAL_ERROR_CODES.VALIDATION_FAILED, { cause });
			}

			throw new IdentityError(IDENTITY_ERROR_CODES.CODE_REQUEST_FAILED, { cause });
		}
	}

	async verifyEmailCode({ userId, code }: VerifyEmailCodeCommand): Promise<void> {
		try {
			await this.account.createSession({
				userId,
				secret: code.trim()
			});
		} catch (cause) {
			if (cause instanceof AppwriteException && cause.code === 401) {
				throw new IdentityError(IDENTITY_ERROR_CODES.INVALID_CODE, { cause });
			}

			if (cause instanceof AppwriteException && cause.code === 400) {
				throw new IdentityError(UNIVERSAL_ERROR_CODES.VALIDATION_FAILED, { cause });
			}

			throw new IdentityError(IDENTITY_ERROR_CODES.CODE_VERIFICATION_FAILED, { cause });
		}
	}
}
