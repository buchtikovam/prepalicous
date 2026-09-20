<script lang="ts">
	import type { Snippet } from 'svelte';

	import { SidebarProvider } from '$ui/sidebar';

	import FloatingNavDock from '$blocks/FloatingNavDock.svelte';
	import Sidebar from '$blocks/Sidebar.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<SidebarProvider style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);">
	<div class="hidden lg:contents">
		<Sidebar />
	</div>

	<main class="m-2 ml-0 flex-1 pb-20 lg:pb-0">
		{@render children?.()}
	</main>

	<FloatingNavDock />
</SidebarProvider>
