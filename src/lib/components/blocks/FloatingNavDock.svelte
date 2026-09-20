<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import CookingPot from '$lucide/cooking-pot.svelte';
	import LayoutDashboard from '$lucide/layout-dashboard.svelte';
	import NotebookPen from '$lucide/notebook-pen.svelte';
	import ShoppingCart from '$lucide/shopping-cart.svelte';

	import { i18n } from '$lib/i18n/index.svelte';

	const items = $derived([
		{ title: i18n.t.sidebar.dashboard, url: resolve('/app/dashboard'), icon: LayoutDashboard },
		{ title: i18n.t.sidebar.recipes, url: resolve('/app/recipes'), icon: CookingPot },
		{ title: i18n.t.sidebar.mealPlanner, url: resolve('/app/planner'), icon: NotebookPen },
		{ title: i18n.t.sidebar.shopping, url: resolve('/app/shopping'), icon: ShoppingCart }
	]);

	const isActive = (url: string) => page.url.pathname === url || page.url.pathname.startsWith(`${url}/`);
</script>

<nav
	aria-label={i18n.t.sidebar.application}
	class="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-3xl border bg-card/95 p-1.5 shadow-xl backdrop-blur lg:hidden"
>
	{#each items as item (item.url)}
		{@const active = isActive(item.url)}

		<a
			href={item.url}
			aria-label={item.title}
			aria-current={active ? 'page' : undefined}
			class="flex h-12 min-w-12 items-center justify-center gap-2 rounded-[1.125rem] px-3 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 data-[active=true]:bg-primary/10 data-[active=true]:text-primary dark:data-[active=true]:bg-primary/20 dark:data-[active=true]:text-sidebar-primary"
			data-active={active}
		>
			<item.icon class="size-6 shrink-0" strokeWidth={1.8} />
			{#if active}
				<span class="hidden text-sm font-semibold whitespace-nowrap sm:inline">{item.title}</span>
			{/if}
		</a>
	{/each}
</nav>
