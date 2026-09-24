import type { CapacitorConfig } from '@capacitor/cli';

const development = process.env.npm_lifecycle_event?.startsWith('development') ?? false;

const config: CapacitorConfig = {
	appId: 'app.prepalicious',
	appName: 'prepalicious',
	webDir: 'build',
	android: {
		minWebViewVersion: 111,
		allowMixedContent: development ? true : undefined
	},
	plugins: {
		SplashScreen: {
			launchAutoHide: false
		}
	},
	server: {
		url: development ? 'http://localhost:80' : undefined,
		cleartext: development ? true : undefined,
		errorPath: 'error.html'
	}
};

export default config;
