import { SUPPORTED_LOCALES, type SupportedLocale } from './types';

export function isSupportedLocale(locale: string): locale is SupportedLocale {
	return (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}

export function normalizeLocale(locale: string | undefined): SupportedLocale | undefined {
	if (!locale) return undefined;

	const languageCode = locale.split(/[-_]/)[0]?.toLowerCase();
	return languageCode && isSupportedLocale(languageCode) ? languageCode : undefined;
}
