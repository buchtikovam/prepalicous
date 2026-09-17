import type { SupportedLocale } from './types';

export interface LocaleFormatters {
	dateTime: (value: Date | number, options?: Intl.DateTimeFormatOptions) => string;
	number: (value: number | bigint, options?: Intl.NumberFormatOptions) => string;
	plural: (value: number, options?: Intl.PluralRulesOptions) => Intl.LDMLPluralRule;
	relativeTime: (
		value: number,
		unit: Intl.RelativeTimeFormatUnit,
		options?: Intl.RelativeTimeFormatOptions
	) => string;
}

export function createLocaleFormatters(locale: SupportedLocale): LocaleFormatters {
	return {
		dateTime: (value, options) => new Intl.DateTimeFormat(locale, options).format(value),
		number: (value, options) => new Intl.NumberFormat(locale, options).format(value),
		plural: (value, options) => new Intl.PluralRules(locale, options).select(value),
		relativeTime: (value, unit, options) => new Intl.RelativeTimeFormat(locale, options).format(value, unit)
	};
}
