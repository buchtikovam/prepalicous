import { ApplicationError, type UniversalErrorCode } from '$lib/shared/errors/application-error';

export const IDENTITY_ERROR_CODES = {
	CODE_REQUEST_FAILED: 'IDENTITY_CODE_REQUEST_FAILED',
	CODE_VERIFICATION_FAILED: 'IDENTITY_CODE_VERIFICATION_FAILED',
	INVALID_CODE: 'IDENTITY_INVALID_CODE'
} as const;

export type IdentitySpecificErrorCode = (typeof IDENTITY_ERROR_CODES)[keyof typeof IDENTITY_ERROR_CODES];

export type IdentityErrorCode = UniversalErrorCode | IdentitySpecificErrorCode;

export class IdentityError extends ApplicationError<IdentityErrorCode> {
	constructor(code: IdentityErrorCode, options?: ErrorOptions) {
		super(code, options);
		this.name = 'IdentityError';
	}
}
