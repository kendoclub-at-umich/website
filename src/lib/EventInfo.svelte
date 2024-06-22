<script lang="ts">
	import type { EventImpl } from '@fullcalendar/core/internal';
	import { mdiMapMarkerOutline, mdiText, mdiClockOutline } from '@mdi/js';

	import { getFileIconByMimeType } from './mime-types';

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

	$: extendedProps = event.extendedProps as ExtendedProps;
</script>

<div class="event-detail-grid">
	<h3 class="header">{event.title}</h3>

	<svg
		xmlns="http://www.w3.org/2000/svg"
		height="24px"
		width="24px"
		viewBox="0 0 24 24"
		role="img"
		aria-label="Time"
	>
		<path fill="currentColor" d={mdiClockOutline} />
	</svg>
	<div>
		{dateRange}
	</div>

	{#if extendedProps.location != undefined}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			width="24px"
			viewBox="0 0 24 24"
			role="img"
			aria-label="Location"
		>
			<path fill="currentColor" d={mdiMapMarkerOutline} />
		</svg>
		<div>
			<a href="https://www.google.com/maps/search/?api=1&query={extendedProps.location}">
				{extendedProps.location}
			</a>
		</div>
	{/if}

	{#if extendedProps.description != undefined}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			width="24px"
			viewBox="0 0 24 24"
			role="img"
			aria-label="Description"
		>
			<path fill="currentColor" d={mdiText} />
		</svg>
		<div class="description">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -- because we trust the description from google calendar -->
			{@html extendedProps.description}
		</div>
	{/if}

	{#each extendedProps.attachments as attachment}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			width="24px"
			viewBox="0 0 24 24"
			role="img"
			aria-label="Attachment"
		>
			<path fill="currentColor" d={getFileIconByMimeType(attachment.mimeType)}></path>
		</svg>
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
	svg:has(+ .description) {
		align-self: start;
	}
</style>
