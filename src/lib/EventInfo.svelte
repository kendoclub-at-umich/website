<script lang="ts">
	import type { EventImpl } from '@fullcalendar/core/internal';
	import { mdiMapMarker, mdiText, mdiClock } from '@mdi/js';

	export let event: EventImpl;

	const englishDateTimeFormatter = new Intl.DateTimeFormat('en-US', {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	});

	const englishDateOnlyFormatter = new Intl.DateTimeFormat('en-US', {
		weekday: 'short',
		month: 'short',
		day: 'numeric'
	});

	$: dateFormatter = event.allDay ? englishDateOnlyFormatter : englishDateTimeFormatter;

	$: dateRange = dateFormatter.formatRange(event.start!, event.end!);
</script>

<div class="event-detail-grid">
	<h3 class="header">{event.title}</h3>

	<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24px 24px">
		<path fill="currentColor" d={mdiClock} />
	</svg>
	<div>
		{dateRange}
	</div>

	{#if event.extendedProps.location != undefined}
		<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24px 24px">
			<path fill="currentColor" d={mdiMapMarker} />
		</svg>
		<div>
			<a href="https://www.google.com/maps/search/?api=1&query={event.extendedProps.location}">
				{event.extendedProps.location}
			</a>
		</div>
	{/if}

	{#if event.extendedProps.description != undefined}
		<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24px 24px">
			<path fill="currentColor" d={mdiText} />
		</svg>
		<div class="description">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -- because we trust the description from google calendar -->
			{@html event.extendedProps.description}
		</div>
	{/if}
</div>

<style>
	.event-detail-grid {
		display: grid;
		grid-template-columns: 24px 1fr;
		gap: 8px;
		align-items: center;
		padding: 8px;
	}
	.header {
		font-size: 1.5em;
		font-weight: 400;
		margin-bottom: 4px;
		grid-column: 1 / -1;
	}
	.description {
		white-space: pre-wrap;
	}
	svg:has(+ .description) {
		align-self: start;
	}
</style>
