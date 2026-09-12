<script lang="ts">
	import { resolve } from '$app/paths';

	import AppHandle from '$ui/AppHandle.svelte';
	import * as Sidebar from '$ui/sidebar';

	import ChartPie from '$lucide/chart-pie.svelte';
	import CookingPot from '$lucide/cooking-pot.svelte';
	import NotebookPen from '$lucide/notebook-pen.svelte';
	import Refrigerator from '$lucide/refrigerator.svelte';
	import ShoppingCart from '$lucide/shopping-cart.svelte';

	const items = [
		{
			title: 'Meal plan',
			url: resolve('/app/dashboard'),
			icon: NotebookPen
		},
		{
			title: 'Recipes',
			url: resolve('/app/recipes'),
			icon: CookingPot
		},
		{
			title: 'Macro tracker',
			url: resolve('/app/macros'),
			icon: ChartPie
		},
		{
			title: 'Pantry',
			url: resolve('/app/pantry'),
			icon: Refrigerator
		},
		{
			title: 'Shopping list',
			url: resolve('/app/shopping'),
			icon: ShoppingCart
		}
	];
</script>

<!-- TODO: recent recipes (sidebar-10) -->

<Sidebar.Root variant="floating">
	<Sidebar.Header class="p-4 font-bold">
		<AppHandle />
	</Sidebar.Header>

	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<!-- <item.icon /> -->
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
			<Sidebar.GroupLabel>Recent</Sidebar.GroupLabel>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer />
</Sidebar.Root>
