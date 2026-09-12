import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				experimental: {
					async: true
				},
				runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
			},
			adapter: adapter({
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
	optimizeDeps: {
		entries: ['src/routes/**/*.{ts,svelte}']
	}
	// server: {
	// 	allowedHosts: ['prepalicous.dev'],
	// 	open: 'https://prepalicous.dev',
	// 	host: 'localhost',
	// 	port: 80
	// },
});
