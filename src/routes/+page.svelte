<script lang="ts">
	import { resolve } from '$app/paths';

	import { Button } from '$lib/components/ui/button';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<Button href={resolve('/app/dashboard')}>dashboard</Button>
<Button href={resolve('/auth')} variant="outline">auth</Button>
