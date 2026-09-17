import type { CapacitorConfig } from '@capacitor/cli';

const development = process.env.npm_lifecycle_event?.startsWith('development') ?? false;

const config: CapacitorConfig = {
	appId: 'app.prepalicous',
	appName: 'prepalicous',
	webDir: 'build',
	android: {
		minWebViewVersion: 111,
		allowMixedContent: development ? true : undefined
	},
	plugins: {
		SplashScreen: {
			launchAutoHide: false
		}
	}
	// backgroundColor: '#8E001C',
	// server: {
	//     errorPath: 'error.html',
	//     // url: development ? 'https://prepalicous.dev' : undefined,
	//     cleartext: development ? true : undefined
	// },
};

export default config;
