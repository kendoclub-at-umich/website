<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		import('./full-calendar');
	});
</script>

<div id="calendar-container" />

<style>
	:global(main:has(#calendar-container)) {
		padding-inline: var(--pico-spacing);
		width: auto;
		max-width: none;
	}

	#calendar-container {
		margin: 0 auto;
		font-size: min(18px, 0.75em);
		max-width: max(640px, calc(400vh / 3 - 270px));
	}
</style>
