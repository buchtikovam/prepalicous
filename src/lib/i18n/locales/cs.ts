import type { Dictionary } from '../types';

const cs = {
	sidebar: {
		application: 'Aplikace',
		mealPlan: 'Jídelní plán',
		recipes: 'Recepty',
		macroTracker: 'Makroživiny',
		pantry: 'Spíž',
		shopping: 'Nákupní seznam',
		recent: 'Nedávné'
	},
	auth: {
		changeEmailBtn: 'Změnit e-mail',
		codeInputLbl: 'Ověřovací kód',
		codeSent: (email) => `Poslali jsme šestimístný kód na ${email}.`,
		description: 'Přihlas se přes Apple, Google nebo e-mail',
		emailInputLbl: 'E-mail',
		genericError: 'Něco se pokazilo. Zkus to prosím znovu.',
		oauthButton: (provider) => `Pokračuj s ${provider}`,
		requestCodeBtn: 'Poslat kód',
		resendCodeBtn: 'Poslat nový kód',
		securityPhrase: (phrase) => `Bezpečnostní fráze: ${phrase}`,
		separator: 'nebo pokračuj s',
		title: 'Vítej, kuchaři',
		verifyCodeBtn: 'Ověřit kód'
	},
	language: {
		label: 'Jazyk',
		options: {
			en: 'Angličtina',
			cs: 'Čeština'
		}
	},
	toggleTheme: 'Přepnout motiv'
} satisfies Dictionary;

export default cs;
