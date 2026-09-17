<script lang="ts">
	import type { Snippet } from 'svelte';

	import { SidebarProvider } from '$ui/sidebar';

	import Sidebar from '$blocks/Sidebar.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<SidebarProvider style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);">
	<Sidebar />

	<main class="m-2 ml-0 flex-1">
		{@render children?.()}
	</main>
</SidebarProvider>
