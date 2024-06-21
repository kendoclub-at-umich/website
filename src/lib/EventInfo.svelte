<script lang="ts">
	import type { EventImpl } from '@fullcalendar/core/internal';
	import { mdiMapMarker, mdiText, mdiCalendar } from '@mdi/js';

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

<p class="heading">{event.title}</p>

<p>{dateRange}</p>

{#if event.extendedProps.location != undefined}
	<p>
		<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24px 24px">
			<path fill="currentColor" d={mdiMapMarker} />
		</svg>
		<a href="https://www.google.com/maps/search/?api=1&query={event.extendedProps.location}">
			{event.extendedProps.location}
		</a>
	</p>
{/if}

{#if event.extendedProps.description != undefined}
	<p class="description">
		<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24px 24px">
			<path fill="currentColor" d={mdiText} />
		</svg> <br />
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- because we trust the description from google calendar -->
		{@html event.extendedProps.description}
	</p>
{/if}

<p>
	<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24px 24px">
		<path fill="currentColor" d={mdiCalendar} />
	</svg>
	<a href={event.url}>View in Google Calendar</a>
</p>

<style>
	svg {
		vertical-align: middle;
	}

	.heading {
		font-size: min(22px, 1.5em);
	}
	.description {
		white-space: pre-wrap;
	}
</style>
