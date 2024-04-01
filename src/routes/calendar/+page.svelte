<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		import('./full-calendar');
	});
</script>

<div id="calendar-container" />
