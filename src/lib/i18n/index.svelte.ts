import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';

import { createLocaleFormatters, type LocaleFormatters } from './formatters';
import { isSupportedLocale, normalizeLocale } from './locale';
import fallbackEn from './locales/en';
import { type Dictionary, type SupportedLocale } from './types';

const DEFAULT_LOCALE: SupportedLocale = 'en';
const LOCALE_STORAGE_KEY = 'prepalicious.locale';

const localeLoaders = {
	en: async () => fallbackEn,
	cs: async () => (await import('./locales/cs')).default
} satisfies Record<SupportedLocale, () => Promise<Dictionary>>;

function getStoredLocale(): SupportedLocale | undefined {
	try {
		const locale = localStorage.getItem(LOCALE_STORAGE_KEY);
		return locale ? normalizeLocale(locale) : undefined;
	} catch {
		return undefined;
	}
}

function storeLocale(locale: SupportedLocale): void {
	try {
		localStorage.setItem(LOCALE_STORAGE_KEY, locale);
	} catch {
		// The language still changes when storage is unavailable or disabled
	}
}

async function detectLocale(): Promise<SupportedLocale | undefined> {
	if (!Capacitor.isNativePlatform()) {
		return normalizeLocale(navigator.language);
	}

	try {
		const { value } = await Device.getLanguageCode();
		return normalizeLocale(value);
	} catch (error) {
		console.warn('Could not detect the device language.', error);
		return undefined;
	}
}

class I18nManager {
	currentLocale = $state<SupportedLocale>(DEFAULT_LOCALE);
	isLoading = $state(false);

	#dictionary = $state<Dictionary>(fallbackEn);
	#formatters = $state.raw<LocaleFormatters>(createLocaleFormatters(DEFAULT_LOCALE));
	#initPromise: Promise<void> | undefined;
	#loadingOperations = 0;
	#requestId = 0;

	get t(): Dictionary {
		return this.#dictionary;
	}

	get format(): LocaleFormatters {
		return this.#formatters;
	}

	/**
	 * Initializes once. Only a preference available on the first call is considered.
	 * If an Appwrite preference arrives later, normalize it and apply it with
	 * `setLanguage(locale, false)` so it wins without replacing the local override.
	 */
	init(userPreference?: string): Promise<void> {
		this.#initPromise ??= this.#initialize(userPreference);
		return this.#initPromise;
	}

	async setLanguage(locale: SupportedLocale, persist = true): Promise<boolean> {
		if (!isSupportedLocale(locale)) return false;

		const requestId = ++this.#requestId;
		this.#startLoading();

		try {
			const dictionary = await localeLoaders[locale]();

			if (requestId !== this.#requestId) return false;

			this.#dictionary = dictionary;
			this.#formatters = createLocaleFormatters(locale);
			this.currentLocale = locale;

			if (persist) storeLocale(locale);

			return true;
		} catch (error) {
			console.error(`Failed to load translation chunk for locale: ${locale}`, error);
			return false;
		} finally {
			this.#stopLoading();
		}
	}

	async #initialize(userPreference?: string): Promise<void> {
		this.#startLoading();

		try {
			// Preference order: authenticated user -> local override -> device/browser -> fallback
			const targetLocale =
				normalizeLocale(userPreference) ?? getStoredLocale() ?? (await detectLocale()) ?? DEFAULT_LOCALE;
			await this.setLanguage(targetLocale, false);
		} finally {
			this.#stopLoading();
		}
	}

	#startLoading(): void {
		this.#loadingOperations += 1;
		this.isLoading = true;
	}

	#stopLoading(): void {
		this.#loadingOperations = Math.max(0, this.#loadingOperations - 1);
		this.isLoading = this.#loadingOperations > 0;
	}
}

export const i18n = new I18nManager();
