export type RequestEmailCodeCommand = Readonly<{
	email: string;
}>;

export type VerifyEmailCodeCommand = Readonly<{
	userId: string;
	code: string;
}>;

export type EmailCodeChallenge = Readonly<{
	userId: string;
	securityPhrase?: string;
}>;

export interface Authentication {
	requestEmailCode(command: RequestEmailCodeCommand): Promise<EmailCodeChallenge>;
	verifyEmailCode(command: VerifyEmailCodeCommand): Promise<void>;
}
