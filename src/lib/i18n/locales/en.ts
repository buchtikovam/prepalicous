import type { Dictionary } from '../types';

const en = {
	sidebar: {
		application: 'Application',
		mealPlan: 'Meal plan',
		recipes: 'Recipes',
		macroTracker: 'Macro tracker',
		pantry: 'Pantry',
		shopping: 'Shopping list',
		recent: 'Recent'
	},
	auth: {
		changeEmailBtn: 'Change email',
		codeInputLbl: 'Verification code',
		codeSent: (email) => `We sent a six-digit code to ${email}.`,
		description: 'Sign in with Apple, Google, or email',
		emailInputLbl: 'Email',
		genericError: 'Something went wrong. Please try again.',
		oauthButton: (provider) => `Continue with ${provider}`,
		requestCodeBtn: 'Send code',
		resendCodeBtn: 'Send a new code',
		securityPhrase: (phrase) => `Security phrase: ${phrase}`,
		separator: 'or continue with',
		title: 'Welcome, chef',
		verifyCodeBtn: 'Verify code'
	},
	language: {
		label: 'Language',
		options: {
			en: 'English',
			cs: 'Czech'
		}
	},
	toggleTheme: 'Toggle theme'
} satisfies Dictionary;

export default en;
