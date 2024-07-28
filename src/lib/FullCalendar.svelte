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
	import {
		mdiCalendarToday,
		mdiCheck,
		mdiChevronLeft,
		mdiChevronRight,
		mdiContentCopy,
		mdiViewComfy,
		mdiViewSequential
	} from '@mdi/js';
	import { wait } from './promise-helper';
	import { showModal } from './modal';
	import { browser } from '$app/environment';

	export let googleCalendarApiKey: string;
	export let googleCalendarId: string;

	let calendarContainer: HTMLDivElement;
	let calendar: Calendar | undefined;
	let selectedMonth = '';
	let currentMonth = '';
	let selectedView: string | undefined;

	const englishMonthFormatter = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		year: 'numeric'
	});

	let supportsAppleCalendar = false;

	onMount(() => {
		supportsAppleCalendar = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);

		const smallScreenQuery = matchMedia('(width < 768px)');

		const shadowDom = calendarContainer.attachShadow({ mode: 'open' });

		const styleSheet = new CSSStyleSheet();
		styleSheet.replaceSync(shadowCss);
		shadowDom.adoptedStyleSheets = [styleSheet];

		const calendarElement = document.createElement('div');
		shadowDom.appendChild(calendarElement);

		currentMonth = englishMonthFormatter.format(new Date());
		selectedMonth = currentMonth;

		calendar = new Calendar(calendarElement, {
			plugins: [dayGridPlugin, listPlugin, googleCalendarPlugin],
			initialView: smallScreenQuery.matches ? 'listMonth' : 'dayGridMonth',
			headerToolbar: false,
			googleCalendarApiKey,
			events: { googleCalendarId },
			aspectRatio: 4 / 3,
			datesSet: () => {
				selectedMonth = englishMonthFormatter.format(calendar?.getDate());
			},
			viewDidMount: ({ view }) => {
				selectedView = view.type;
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

	let addToOtherCalendarDialog: HTMLDialogElement;

	$: icalUrl = `calendar.google.com/calendar/ical/${googleCalendarId}/public/basic.ics`;

	let recentlyCopiedToClipboard = false;

	async function copyIcalUrl() {
		await navigator.clipboard.writeText(icalUrl);
		recentlyCopiedToClipboard = true;
		await wait(2_000);
		recentlyCopiedToClipboard = false;
	}

	let previousTouch: Touch | undefined;

	function onTouchStart(event: TouchEvent) {
		previousTouch = event.touches[0];
	}

	function onTouchEnd(event: TouchEvent) {
		if (event.touches.length > 0 || previousTouch == undefined) {
			return;
		}

		const currentTouch = event.changedTouches[0];
		const xDistance = currentTouch.clientX - previousTouch.clientX;
		const yDistance = currentTouch.clientY - previousTouch.clientY;

		if (Math.abs(yDistance) > Math.abs(xDistance) || Math.abs(xDistance) < 24) {
			return;
		}

		if (xDistance > 0) {
			calendar?.prev();
		} else {
			calendar?.next();
		}

		previousTouch = undefined;
	}
</script>

<div class="calendar-wrapper">
	<div class="top-left">
		<div role="group">
			<button class="outline" on:click={() => calendar?.prev()}>
				<SvgIcon label="previous month" path={mdiChevronLeft} />
			</button>
			<button class="outline" on:click={() => calendar?.next()}>
				<SvgIcon label="next month" path={mdiChevronRight} />
			</button>
		</div>
		<button
			class="outline today"
			on:click={() => calendar?.today()}
			disabled={selectedMonth == currentMonth}
		>
			<SvgIcon label="today" path={mdiCalendarToday} />
			<span class="label">Today</span>
		</button>
	</div>
	<h2>{selectedMonth}</h2>
	<div class="top-right" role="group">
		<button
			class="outline"
			on:click={() => calendar?.changeView('dayGridMonth')}
			disabled={selectedView == 'dayGridMonth'}
		>
			<SvgIcon label="grid" path={mdiViewComfy} />
			<span class="label">Grid</span>
		</button>
		<button
			class="outline"
			on:click={() => calendar?.changeView('listMonth')}
			disabled={selectedView == 'listMonth'}
		>
			<SvgIcon label="list" path={mdiViewSequential} />
			<span class="label">List</span>
		</button>
	</div>

	<div
		id="calendar-container"
		bind:this={calendarContainer}
		on:touchstart={onTouchStart}
		on:touchend={onTouchEnd}
	>
		<div class="placeholder"></div>
	</div>

	<div class="bottom">
		<a
			role="button"
			class="outline"
			href="https://calendar.google.com/calendar/r?cid={googleCalendarId}"
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
		<button class="outline" on:click={() => showModal(addToOtherCalendarDialog)}>
			Add to Other Calendar
		</button>
	</div>
</div>

<dialog bind:this={addToOtherCalendarDialog}>
	<article>
		<h2>Add to Your Calendar</h2>
		<p>
			Copy the iCal url into your calendar app to automatically add Kendo Club events to your
			calendar.
		</p>
		<div role="group">
			<input value={icalUrl} readonly />
			{#if browser && 'clipboard' in navigator}
				<button aria-label="Copy" class="secondary" on:click={copyIcalUrl}>
					<SvgIcon label="" path={recentlyCopiedToClipboard ? mdiCheck : mdiContentCopy} />
				</button>
			{/if}
		</div>
	</article>
</dialog>

<style>
	:global(main:has(#calendar-container)) {
		max-width: none;
	}

	.calendar-wrapper {
		--pico-form-element-spacing-vertical: 8px;
		--pico-form-element-spacing-horizontal: 12px;
		--pico-line-height: 1;
		margin: 0 auto;
		max-width: max(640px, calc((4 / 3) * (100lvh - (4.25rem + 104px))));
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: 16px;
		margin-bottom: var(--pico-typography-spacing-vertical);

		& * {
			margin: 0;
		}

		& .top-left,
		& .bottom {
			justify-self: start;
			display: flex;

			gap: 12px;
		}
		& .top-right {
			justify-self: end;
		}
		& .bottom {
			grid-column: 1 / -1;
			flex-wrap: wrap;
		}

		& [role='group'] {
			width: unset;
		}

		& button .label {
			padding-right: 4px;
		}

		& h2 {
			font-size: 1.25rem;
		}
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
		.calendar-wrapper {
			--pico-form-element-spacing-vertical: 6px;
		}
	}

	#calendar-container {
		grid-column: 1 / -1;
		font-size: min(18px, 0.75em);

		& .placeholder {
			aspect-ratio: 4/3;
		}
	}
</style>
