<script lang="ts">
	import { resolve } from '$app/paths';

	import AppHandle from '$ui/AppHandle.svelte';
	import * as Sidebar from '$ui/sidebar';

	import CookingPot from '$lucide/cooking-pot.svelte';
	import LayoutDashboard from '$lucide/layout-dashboard.svelte';
	import NotebookPen from '$lucide/notebook-pen.svelte';
	import ShoppingCart from '$lucide/shopping-cart.svelte';

	import { i18n } from '$lib/i18n/index.svelte';

	const items = $derived([
		{
			title: i18n.t.sidebar.dashboard,
			url: resolve('/app/dashboard'),
			icon: LayoutDashboard
		},
		{
			title: i18n.t.sidebar.recipes,
			url: resolve('/app/recipes'),
			icon: CookingPot
		},
		{
			title: i18n.t.sidebar.mealPlanner,
			url: resolve('/app/planner'),
			icon: NotebookPen
		},
		{
			title: i18n.t.sidebar.shopping,
			url: resolve('/app/shopping'),
			icon: ShoppingCart
		}
	]);
</script>

<Sidebar.Root variant="floating">
	<Sidebar.Header class="p-4 font-bold">
		<AppHandle />
	</Sidebar.Header>

	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>{i18n.t.sidebar.application}</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.url)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>

		<Sidebar.Group>
			<Sidebar.GroupLabel>{i18n.t.sidebar.recent}</Sidebar.GroupLabel>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer />
</Sidebar.Root>
