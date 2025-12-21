<script lang="ts">
	import { browser } from '$app/environment';
	import MetaTags from '$lib/MetaTags.svelte';
	import FullCalendar from '$lib/FullCalendar.svelte';
	import SvgIcon from '$lib/SvgIcon.svelte';
	import {
		mdiCalendarToday,
		mdiCheck,
		mdiChevronLeft,
		mdiChevronRight,
		mdiContentCopy,
		mdiViewComfy,
		mdiViewSequential
	} from '@mdi/js';
	import Modal from '$lib/Modal.svelte';
	import { wait } from '$lib/promise-helper';

	const googleCalendarId = 'c_1pcp6odi9qfe276tpuob8h00ms@group.calendar.google.com';

	let selectedView: 'listMonth' | 'dayGridMonth' | undefined = $state();

	const supportsAppleCalendar = browser && /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);

	let addToOtherCalendarDialog: Modal;

	const icalUrl = `calendar.google.com/calendar/ical/${googleCalendarId}/public/basic.ics`;

	let recentlyCopiedToClipboard = $state(false);

	async function copyIcalUrl() {
		await navigator.clipboard.writeText('https://' + icalUrl);
		recentlyCopiedToClipboard = true;
		await wait(2_000);
		recentlyCopiedToClipboard = false;
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://www.googleapis.com" />
	<MetaTags
		title="Calendar"
		description="Club practice times and information about upcoming kendo events."
	/>
</svelte:head>

<FullCalendar
	googleCalendarApiKey="AIzaSyDHUqblOxNndbN7jUXvoKy8IugKLlSXbkE"
	{googleCalendarId}
	bind:selectedView
>
	{#snippet top({ previous, next, today, todayDisabled, selectedMonth })}
		<div class="top">
			<div class="top-left">
				<div role="group">
					<button class="outline" onclick={previous}>
						<SvgIcon label="previous month" path={mdiChevronLeft} />
					</button>
					<button class="outline" onclick={next}>
						<SvgIcon label="next month" path={mdiChevronRight} />
					</button>
				</div>
				<button class="outline today" onclick={today} disabled={todayDisabled}>
					<SvgIcon label="today" path={mdiCalendarToday} />
					<span class="label">Today</span>
				</button>
			</div>
			<h2>{selectedMonth}</h2>
			<div class="top-right" role="group">
				<button
					class="outline"
					onclick={() => (selectedView = 'dayGridMonth')}
					disabled={selectedView === 'dayGridMonth'}
				>
					<SvgIcon label="grid" path={mdiViewComfy} />
					<span class="label">Grid</span>
				</button>
				<button
					class="outline"
					onclick={() => (selectedView = 'listMonth')}
					disabled={selectedView === 'listMonth'}
				>
					<SvgIcon label="list" path={mdiViewSequential} />
					<span class="label">List</span>
				</button>
			</div>
		</div>
	{/snippet}

	{#snippet bottom()}
		<div class="bottom">
			<a
				role="button"
				class="outline"
				href="https://calendar.google.com/calendar/render?cid={googleCalendarId}"
				target="_blank"
				rel="noreferrer"
			>
				Add to Google Calendar
			</a>
			{#if supportsAppleCalendar}
				<a role="button" class="outline" href="webcal://{icalUrl}" target="_blank" rel="noreferrer">
					Add to Apple Calendar
				</a>
			{/if}
			<!-- eslint-disable-next-line -- eslint seems confused. vscode knows what open() is -->
			<button class="outline" onclick={() => addToOtherCalendarDialog.open()}>
				Add to Other Calendar
			</button>
		</div>
	{/snippet}
</FullCalendar>

<Modal bind:this={addToOtherCalendarDialog}>
	<h2>Add to Your Calendar</h2>
	<p>Copy this iCal url into your calendar app to subscribe to the Kendo Club at Umich calendar.</p>
	<div role="group">
		<input value="https://{icalUrl}" readonly />
		{#if browser && 'clipboard' in navigator}
			<button aria-label="Copy" class="secondary" onclick={copyIcalUrl}>
				<SvgIcon label="" path={recentlyCopiedToClipboard ? mdiCheck : mdiContentCopy} />
			</button>
		{/if}
	</div>
</Modal>

<style>
	:global(main:has(.full-calendar)) {
		width: 100%;
	}

	.top,
	.bottom {
		--pico-form-element-spacing-vertical: 8px;
		--pico-form-element-spacing-horizontal: 12px;
		--pico-line-height: 1;

		& [role='group'] {
			margin: 0;
			width: unset;
		}
	}

	.top {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: 16px;

		& h2 {
			margin: 0;
			font-size: 1.25rem;
		}
	}

	.top-left,
	.bottom {
		justify-self: start;
		display: flex;

		gap: 12px;
	}

	.top-right {
		justify-self: end;
	}

	.bottom {
		grid-column: 1 / -1;
		flex-wrap: wrap;
	}

	button .label {
		padding-right: 4px;
	}

	@media (width <= 600px) {
		button .label {
			display: none;
		}
	}

	@media (width <= 480px) {
		.today {
			display: none;
		}
	}

	@media (width <= 400px) {
		.top,
		.bottom {
			--pico-form-element-spacing-vertical: 6px;
		}
	}
</style>
