import { defineConfig } from '@playwright/test';

export default defineConfig({
	testMatch: '**/*.e2e.{ts,js}',
	use: { baseURL: 'http://127.0.0.1:5173' },
	webServer: {
		command: 'npm run development:dev -- --host 127.0.0.1',
		reuseExistingServer: !process.env.CI,
		url: 'http://127.0.0.1:5173'
	}
});
