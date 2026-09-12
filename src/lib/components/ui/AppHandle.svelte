<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';

	import Carrot from '$lucide/carrot.svelte';

	import { cn } from '$lib/utils';

	import Row from './layout/Row.svelte';

	let { class: className }: { class?: string } = $props();
</script>

<Row class={cn('items-center gap-2 font-bold', className)}>
	<div class="flex size-7 min-w-7 items-center justify-center rounded-sm bg-primary text-primary-foreground">
		<Carrot class="size-5" />
	</div>
	{PUBLIC_APP_NAME}
</Row>
