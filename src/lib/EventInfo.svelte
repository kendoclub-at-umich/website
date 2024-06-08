<script lang="ts">
	import type { EventImpl } from '@fullcalendar/core/internal';

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

<p>{event.title}</p>

<p>{dateRange}</p>

{#if event.extendedProps.location != undefined}
	<p>
		<a href="https://www.google.com/maps/search/?api=1&query={event.extendedProps.location}">
			{event.extendedProps.location}
		</a>
	</p>
{/if}

{#if event.extendedProps.description != undefined}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- because we trust the description from google calendar -->
	<p>{@html event.extendedProps.description}</p>
{/if}

<p><a href={event.url}>view in google calendar</a></p>

<style>
	p {
		white-space: pre-wrap;
	}
</style>
