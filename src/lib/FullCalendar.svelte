<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Calendar } from '@fullcalendar/core';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import listPlugin from '@fullcalendar/list';
	import googleCalendarPlugin from '@fullcalendar/google-calendar';
	import shadowCss from './full-calendar-shadow.css?inline';
	import tippy, { type ReferenceElement } from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import './tippy-theme.css';
	import EventInfo from './EventInfo.svelte';
	import SvgIcon from './SvgIcon.svelte';
	import { mdiCheck, mdiContentCopy } from '@mdi/js';
	import { wait } from './promise-helper';

	export let googleCalendarApiKey: string;
	export let googleCalendarId: string;

	let calendarContainer: HTMLDivElement;
	let calendar: Calendar | undefined;
	let selectedMonth = '';

	const englishMonthFormatter = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		year: 'numeric'
	});

	onMount(() => {
		const smallScreenQuery = matchMedia('(width < 768px)');

		const shadowDom = calendarContainer.attachShadow({ mode: 'open' });

		const styleSheet = new CSSStyleSheet();
		styleSheet.replaceSync(shadowCss);
		shadowDom.adoptedStyleSheets = [styleSheet];

		const calendarElement = document.createElement('div');
		shadowDom.appendChild(calendarElement);

		selectedMonth = englishMonthFormatter.format(new Date());

		calendar = new Calendar(calendarElement, {
			plugins: [dayGridPlugin, listPlugin, googleCalendarPlugin],
			initialView: smallScreenQuery.matches ? 'listMonth' : 'dayGridMonth',
			headerToolbar: false,
			googleCalendarApiKey,
			events: { googleCalendarId },
			datesSet: () => {
				selectedMonth = englishMonthFormatter.format(calendar?.getDate());
			},
			eventDidMount: ({ el, event, view }) => {
				let component: EventInfo | undefined;
				if (view.type == 'listMonth') {
					el.querySelector('a')?.removeAttribute('href');
				} else {
					el.removeAttribute('href');
				}
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

	function addToGoogleCalendar() {
		window.open(
			`https://calendar.google.com/calendar/r?cid=${googleCalendarId}`,
			'_blank',
			'noreferrer'
		);
	}

	let addToOtherCalendarDialog: HTMLDialogElement;

	$: icalUrl = `https://calendar.google.com/calendar/ical/${googleCalendarId}/public/basic.ics`;

	function addToOtherCalendar() {
		addToOtherCalendarDialog.showModal();
		// window.open(
		// 	`webcal://https://calendar.google.com/calendar/ical/${googleCalendarId}/public/basic.ics`,
		// 	'_blank',
		// 	'noreferrer'
		// );
	}

	async function copyToClipboard() {
		await navigator.clipboard.writeText(icalUrl);
		recentlyCopiedToClipboard = true;
		await wait(2_000);
		recentlyCopiedToClipboard = false;
	}

	let recentlyCopiedToClipboard = false;

	const icalImportGuides = [
		{
			name: 'iPhone',
			url: 'https://support.apple.com/guide/iphone/iph3d1110d4'
		},
		{
			name: 'Mac',
			url: 'https://support.apple.com/guide/calendar/icl1022'
		},
		{
			name: 'Outlook',
			url: 'https://support.microsoft.com/en-us/office/8e8364e1-400e-4c0f-a573-fe76b5a2d379'
		}
	];
</script>

<button on:click={() => calendar?.prev()}>previous</button>
<button on:click={() => calendar?.next()}>next</button>
<button on:click={() => calendar?.today()}>today</button>
<span>{selectedMonth}</span>
<button on:click={() => calendar?.changeView('dayGridMonth')}>month</button>
<button on:click={() => calendar?.changeView('listMonth')}>list</button>

<div id="calendar-container" bind:this={calendarContainer} />

<button on:click={addToGoogleCalendar}>Add to Google Calendar</button>
<button on:click={addToOtherCalendar}>Add to Other Calendar</button>

<dialog bind:this={addToOtherCalendarDialog}>
	<article>
		<h2>Add to your Calendar</h2>
		<p>
			Copy this iCalendar url into your Calendar app to automatically add Kendo Club at Umich events
			to your calendar.
		</p>

		<div role="group">
			<input value={icalUrl} readonly />
			<button class="secondary" on:click={copyToClipboard}>
				<SvgIcon label="Copy" path={recentlyCopiedToClipboard ? mdiCheck : mdiContentCopy} />
			</button>
		</div>

		<ul>
			{#each icalImportGuides as guide}
				<li><a href={guide.url}>Instructions for {guide.name}</a></li>
			{/each}
		</ul>

		<a role="button" class="secondary" href="webcal://{icalUrl}" target="_blank" rel="noreferrer">
			Open in default calendar app
		</a>
	</article>
</dialog>

<style>
	:global(main:has(#calendar-container)) {
		max-width: none;
	}

	#calendar-container {
		margin: 0 auto;
		font-size: min(18px, 0.75em);
		max-width: max(640px, calc((4 / 3) * (100lvh - 9.5rem)));
		margin-bottom: var(--pico-typography-spacing-vertical);
	}
</style>
