<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	import { cn } from '$lib/utils';

	let {
		children,
		...props
	}: {
		children?: Snippet;
	} & SvelteHTMLElements['div'] = $props();
</script>

<div data-component="column" {...props} class={cn('flex flex-col', props.class)}>
	{@render children?.()}
</div>
