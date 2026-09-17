export const SUPPORTED_LOCALES = ['en', 'cs'] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export interface Dictionary {
	sidebar: {
		application: string;
		mealPlan: string;
		recipes: string;
		macroTracker: string;
		pantry: string;
		shopping: string;
		recent: string;
	};

	auth: {
		changeEmailBtn: string;
		codeInputLbl: string;
		codeSent: (email: string) => string;
		description: string;
		emailInputLbl: string;
		genericError: string;
		oauthButton: (provider: string) => string;
		requestCodeBtn: string;
		resendCodeBtn: string;
		securityPhrase: (phrase: string) => string;
		separator: string;
		title: string;
		verifyCodeBtn: string;
	};
	language: {
		label: string;
		options: Record<SupportedLocale, string>;
	};
	toggleTheme: string;
}
