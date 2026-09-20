import tailwindcss from '@tailwindcss/vite';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

import adapterStatic from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				experimental: { async: true },
				runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
			},

			adapter: adapterStatic({
				pages: 'build',
				assets: 'build',
				fallback: 'index.html',
				precompress: false,
				strict: true
			}),

			typescript: {
				config: (config) => {
					config.include.push('capacitor.config.ts');
					return config;
				}
			},

			alias: {
				$assets: './src/lib/assets',
				$packages: './src/lib/packages',
				$services: './src/lib/services',
				$states: './src/lib/states',
				$ui: './src/lib/components/ui',
				$blocks: './src/lib/components/blocks',
				$lucide: './node_modules/@lucide/svelte/dist/icons',
				$icons: './src/lib/components/icons',
				package: './package.json'
			}
		})
	],
	optimizeDeps: { entries: ['src/routes/**/*.{ts,svelte}'] },
	test: {
		coverage: {
			provider: 'v8'
		},
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	},
	server: {
		strictPort: true,
		host: '0.0.0.0',
		port: 5173
	}
});
