import { expect, test } from '@playwright/test';

test('has auth form', async ({ page }) => {
	await page.goto('/auth');
	await expect(page.getByTestId('auth-form')).toBeVisible();
});
