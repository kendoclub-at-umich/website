<script lang="ts">
	import type { EventImpl } from '@fullcalendar/core/internal';
	import { mdiMapMarkerOutline, mdiText, mdiClockOutline } from '@mdi/js';
	import { getFileIconByMimeType } from './mime-types';
	import SvgIcon from './SvgIcon.svelte';

	const { event }: { event: EventImpl } = $props();

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

	const dateFormatter = $derived(
		event.allDay ? englishDateOnlyFormatter : englishDateTimeFormatter
	);

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Google Calendar events always have a start and end date
	const dateRange = $derived(dateFormatter.formatRange(event.start!, event.end!));

	type Attachment = {
		fileId: string;
		fileUrl: string;
		iconLink: string;
		mimeType: string;
		title: string;
	};

	type ExtendedProps = {
		attachments: Attachment[];
		description?: string;
		location?: string;
	};

	const extendedProps = $derived(event.extendedProps as ExtendedProps);
</script>

<div class="event-detail-grid">
	<h3 class="header">{event.title}</h3>

	<SvgIcon label="Time" path={mdiClockOutline} />
	<div>
		{dateRange}
	</div>

	{#if extendedProps.location !== undefined}
		<SvgIcon label="Location" path={mdiMapMarkerOutline} />
		<div>
			<a href="https://www.google.com/maps/search/?api=1&query={extendedProps.location}">
				{extendedProps.location}
			</a>
		</div>
	{/if}

	{#if extendedProps.description !== undefined}
		<SvgIcon label="Description" path={mdiText} />
		<div class="description">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -- because we trust the description from google calendar -->
			{@html extendedProps.description}
		</div>
	{/if}

	{#each extendedProps.attachments as attachment (attachment.fileUrl)}
		<SvgIcon label="Attachment" path={getFileIconByMimeType(attachment.mimeType)} />
		<div><a href={attachment.fileUrl}>{attachment.title}</a></div>
	{/each}
</div>

<style>
	.event-detail-grid {
		display: grid;
		grid-template-columns: auto 1fr;
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
		overflow-wrap: anywhere;
	}
	* :global(svg:has(+ .description)) {
		align-self: start;
	}
</style>
