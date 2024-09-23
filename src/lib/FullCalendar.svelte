<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Calendar } from '@fullcalendar/core';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import listPlugin from '@fullcalendar/list';
	import googleCalendarPlugin from '@fullcalendar/google-calendar';
	import './full-calendar.css';
	import tippy, { type ReferenceElement } from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import './tippy-theme.css';
	import EventInfo from './EventInfo.svelte';
	import { mdiCheck, mdiContentCopy } from '@mdi/js';
	import SvgIcon from './SvgIcon.svelte';
	import { browser } from '$app/environment';

	export let googleCalendarApiKey: string;
	export let googleCalendarId: string;

	let calendarElement: HTMLDivElement;
	let calendar: Calendar | undefined;

	let addToOtherCalendarDialog: HTMLDialogElement;

	onMount(() => {
		const smallScreenQuery = matchMedia('(width < 768px)');
		const supportsAppleCalendar = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);

		calendar = new Calendar(calendarElement, {
			plugins: [dayGridPlugin, listPlugin, googleCalendarPlugin],
			initialView: smallScreenQuery.matches ? 'listMonth' : 'dayGridMonth',
			headerToolbar: {
				left: 'prev,next today',
				center: 'title',
				right: 'dayGridMonth,listMonth'
			},
			footerToolbar: {
				left: supportsAppleCalendar
					? 'addToGoogleCalendar addToAppleCalendar addToOtherCalendar'
					: 'addToGoogleCalendar addToOtherCalendar'
			},
			customButtons: {
				addToGoogleCalendar: {
					text: 'Add to Google Calendar',
					click: () => {
						window.open('https://calendar.google.com/calendar/r?cid=' + googleCalendarId, '_blank');
					}
				},
				addToAppleCalendar: {
					text: 'Add to Apple Calendar',
					click: () => {
						window.open('webcal://' + icalUrl, '_blank');
					}
				},
				addToOtherCalendar: {
					text: 'Add to Other Calendar',
					click: () => {
						addToOtherCalendarDialog.showModal();
					}
				}
			},
			googleCalendarApiKey,
			events: { googleCalendarId },
			eventSourceSuccess: (events) => {
				for (const event of events) {
					delete event.url;
				}
			},
			eventDidMount: ({ el, event }) => {
				let component: EventInfo | undefined;
				el.setAttribute('tabindex', '0');

				tippy(el, {
					interactive: true,
					appendTo: document.body,
					placement: 'auto',
					theme: 'kendo',
					hideOnClick: false,
					onShow: (instance) => {
						const container = document.createElement('div');
						component = new EventInfo({ target: container, props: { event } });
						instance.setContent(container);
					},
					onHidden: () => {
						component?.$destroy();
					}
				});
			},
			eventWillUnmount: ({ el }) => {
				const instance = (el as ReferenceElement)._tippy;
				instance?.destroy();
			}
		});
		calendar.render();
	});

	onDestroy(() => {
		calendar?.destroy();
	});

	$: icalUrl = `calendar.google.com/calendar/ical/${googleCalendarId}/public/basic.ics`;
	let recentlyCopiedToClipboard = false;

	async function copyIcalUrl() {
		await navigator.clipboard.writeText('https://' + icalUrl);
		recentlyCopiedToClipboard = true;
		setTimeout(() => {
			recentlyCopiedToClipboard = false;
		}, 2_000);
	}
</script>

<div id="full-calendar" class="no-pico" bind:this={calendarElement} />

<!-- Reason: Dialog can be closed with esc key, so it's already able to be interacted with -->
<!-- svelte-ignore a11y-click-events-have-key-events  a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={addToOtherCalendarDialog}
	on:click={(event) => {
		if (event.target === addToOtherCalendarDialog) {
			addToOtherCalendarDialog.close();
		}
	}}
>
	<article>
		<h2>Add to Your Calendar</h2>
		<p>
			Copy this iCal url into your calendar app to subscribe to the Kendo Club at Umich calendar.
		</p>
		<div role="group">
			<input value={'https://' + icalUrl} readonly />
			{#if browser && 'clipboard' in navigator}
				<button class="copy-button" aria-label="Copy" on:click={copyIcalUrl}>
					<SvgIcon label="" path={recentlyCopiedToClipboard ? mdiCheck : mdiContentCopy} />
				</button>
			{/if}
		</div>
	</article>
</dialog>

<style>
	:global(main:has(#full-calendar)) {
		width: 100%;
	}

	#full-calendar {
		margin: 0 auto;
		font-size: min(18px, 0.75em);
		max-width: max(640px, calc((4 / 3) * (100lvh - 225px)));
	}

	#full-calendar :global(:has(> .fc-addToGoogleCalendar-button)) {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75em;

		& > * {
			margin: 0;
		}
	}

	.copy-button {
		display: grid;
		place-items: center;
		padding: var(--pico-form-element-spacing-vertical);
	}
</style>
