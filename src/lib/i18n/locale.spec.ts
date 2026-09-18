import { describe, it, expect } from 'vitest';

import { isSupportedLocale, normalizeLocale } from './locale';

describe('isSupportedLocale', () => {
	it('accepts supported locales', () => {
		expect(isSupportedLocale('en')).toBe(true);
		expect(isSupportedLocale('cs')).toBe(true);
	});

	it('rejects unsupported locales', () => {
		expect(isSupportedLocale('de')).toBe(false);
		expect(isSupportedLocale('')).toBe(false);
	});
});

describe('normalizeLocale', () => {
	it('normalizes supported regional locales', () => {
		expect(normalizeLocale('cs-CZ')).toBe('cs');
		expect(normalizeLocale('EN_us')).toBe('en');
	});

	it('rejects missing and unsupported locales', () => {
		expect(normalizeLocale(undefined)).toBeUndefined();
		expect(normalizeLocale('')).toBeUndefined();
		expect(normalizeLocale('de-DE')).toBeUndefined();
	});
});
