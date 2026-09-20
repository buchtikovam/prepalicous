export const UNIVERSAL_ERROR_CODES = {
	UNEXPECTED: 'UNEXPECTED',
	UNAUTHORIZED: 'UNAUTHORIZED',
	VALIDATION_FAILED: 'VALIDATION_FAILED'
} as const;

export type UniversalErrorCode = (typeof UNIVERSAL_ERROR_CODES)[keyof typeof UNIVERSAL_ERROR_CODES];

export type ErrorEnvelope<TCode extends string = UniversalErrorCode> = Readonly<{
	version: 1;
	ok: false;
	error: Readonly<{
		code: TCode;
		correlationId?: string;
	}>;
}>;

export class ApplicationError<TCode extends string = UniversalErrorCode> extends Error {
	constructor(
		readonly code: TCode,
		options?: ErrorOptions
	) {
		super(code, options);
		this.name = 'ApplicationError';
	}
}
