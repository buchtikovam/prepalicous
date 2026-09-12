<script lang="ts">
	import { ModeWatcher, toggleMode } from 'mode-watcher';

	import { PUBLIC_APP_NAME } from '$env/static/public';

	import favicon from '$assets/favicon.svg';

	import { Button } from '$ui/button';

	import Moon from '$lucide/moon.svelte';
	import Sun from '$lucide/sun.svelte';

	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{PUBLIC_APP_NAME}</title>
</svelte:head>

<div
	class="relative min-h-dvh bg-muted pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] dark:bg-background"
>
	{@render children()}

	<Button onclick={toggleMode} variant="outline" size="icon-lg" class="absolute top-4 right-4">
		<Sun class="size-5 scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
		<Moon class="absolute size-5 scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0" />
	</Button>
</div>

<ModeWatcher />
