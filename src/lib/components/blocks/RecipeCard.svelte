<script lang="ts">
	import { Badge } from '$ui/badge/index.js';
	import { Button } from '$ui/button/index.js';
	import * as Card from '$ui/card/index.js';

	import Heart from '$lucide/heart.svelte';
</script>

<Card.Root class="relative max-w-sm pt-0 [--card-spacing:--spacing(5)]">
	<div class="absolute inset-0 z-30 aspect-video"></div>
	<img
		src="https://cdn.vilgain.com/image/recipe-content/content-desktop-retina/webp/7aee2aa6-ca92-4116-8521-530468bd96c6?v=1769065409"
		alt="Event cover"
		class="relative z-20 aspect-video w-full object-cover"
	/>

	<Button class="absolute top-(--card-spacing) right-(--card-spacing) z-30" size="icon-lg" variant="outline">
		<Heart class="size-5 fill-primary text-primary" />
	</Button>

	<Card.Header>
		<Card.Action>
			<Badge variant="secondary">Featured</Badge>
		</Card.Action>
		<Card.Title>Bulguretto with chicken and tomatoes</Card.Title>
		<!-- <Card.Description>A practical talk on component APIs, accessibility, and shipping faster.</Card.Description> -->
	</Card.Header>

	<!-- <Card.Footer>
		<Button class="w-full">View Event</Button>
	</Card.Footer> -->
</Card.Root>
