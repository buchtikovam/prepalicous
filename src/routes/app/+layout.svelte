<script lang="ts">
	import type { Snippet } from 'svelte';

	import { SidebarProvider } from '$ui/sidebar';

	import Sidebar from '$blocks/Sidebar.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<SidebarProvider style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);">
	<Sidebar />

	<main class="h-full w-full pt-2">
		{@render children?.()}
	</main>
</SidebarProvider>
