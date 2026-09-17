<script lang="ts">
	import { resolve } from '$app/paths';

	import { Button } from '$lib/components/ui/button';
</script>

<Button href={resolve('/app/dashboard')}>dashboard</Button>
<Button href={resolve('/auth')} variant="outline">auth</Button>
