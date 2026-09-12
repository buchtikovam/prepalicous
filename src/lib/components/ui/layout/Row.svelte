<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	import { cn } from '$lib/utils';

	let {
		children,
		element = $bindable(),
		...props
	}: {
		children?: Snippet;
		element?: HTMLDivElement;
	} & SvelteHTMLElements['div'] = $props();
</script>

<div bind:this={element} data-component="row" {...props} class={cn('flex flex-row', props.class)}>
	{@render children?.()}
</div>
