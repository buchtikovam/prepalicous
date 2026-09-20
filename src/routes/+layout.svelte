<script lang="ts">
	import { Capacitor } from '@capacitor/core';
	import { SplashScreen } from '@capacitor/splash-screen';
	import { ModeWatcher, toggleMode } from 'mode-watcher';

	import { onMount, tick } from 'svelte';

	import favicon from '$assets/favicon.svg';

	import { Button } from '$ui/button';

	import Moon from '$lucide/moon.svelte';
	import Sun from '$lucide/sun.svelte';

	import { publicConfig } from '$lib/config/public';
	import { i18n } from '$lib/i18n/index.svelte';
	import { SUPPORTED_LOCALES, type SupportedLocale } from '$lib/i18n/types';

	import '../app.css';

	let { children } = $props();

	$effect(() => {
		document.documentElement.lang = i18n.currentLocale;
	});

	async function initializeApp() {
		try {
			await i18n.init();
			await tick();
		} finally {
			if (Capacitor.isNativePlatform()) {
				try {
					await SplashScreen.hide();
				} catch (error) {
					console.warn('Could not hide the native splash screen.', error);
				}
			}
		}
	}

	onMount(() => {
		void initializeApp();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{publicConfig.appName}</title>
</svelte:head>

<div
	class="relative flex min-h-dvh w-full bg-muted pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] dark:bg-background"
>
	{@render children()}

	<!-- TODO: temp -->
	<div class="absolute top-4 right-4 flex items-center gap-2">
		<label class="sr-only" for="app-language">{i18n.t.language.label}</label>
		<select
			id="app-language"
			class="h-10 rounded-4xl border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50"
			value={i18n.currentLocale}
			disabled={i18n.isLoading}
			onchange={(event) => {
				void i18n.setLanguage(event.currentTarget.value as SupportedLocale);
			}}
		>
			{#each SUPPORTED_LOCALES as locale (locale)}
				<option value={locale}>{i18n.t.language.options[locale]}</option>
			{/each}
		</select>

		<Button onclick={toggleMode} variant="outline" size="icon-lg" aria-label={i18n.t.toggleTheme}>
			<Sun class="size-5 scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
			<Moon class="absolute size-5 scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0" />
		</Button>
	</div>
</div>

<ModeWatcher />
