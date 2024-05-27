<script lang="ts">
	import type { Calendar } from '@fullcalendar/core/index.js';
	import { onDestroy, onMount } from 'svelte';

	let calendarContainer: HTMLDivElement;
	let calendarToDestroy: Calendar;

	onMount(async () => {
		const { generateCalendar } = await import('./full-calendar');
		calendarToDestroy = generateCalendar(calendarContainer);
	});
	onDestroy(() => {
		calendarToDestroy.destroy();
	});
</script>

<div id="calendar-container" bind:this={calendarContainer} />

<style>
	:global(main:has(#calendar-container)) {
		max-width: none;
	}

	#calendar-container {
		margin: 0 auto;
		font-size: min(18px, 0.75em);
		max-width: max(640px, calc((4 / 3) * (100lvh - 200px)));
	}
</style>
