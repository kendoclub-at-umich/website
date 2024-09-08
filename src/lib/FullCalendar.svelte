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

	export let googleCalendarApiKey: string;
	export let googleCalendarId: string;

	let calendarElement: HTMLDivElement;
	let calendar: Calendar | undefined;
	let selectedMonth = '';
	let currentMonth = '';

	export let selectedView: 'listMonth' | 'dayGridMonth' | undefined;
	$: if (calendar !== undefined && selectedView !== undefined) {
		calendar.changeView(selectedView);
	}

	const englishMonthFormatter = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		year: 'numeric'
	});

	onMount(() => {
		const smallScreenQuery = matchMedia('(width < 768px)');

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
				selectedView = view.type as 'listMonth' | 'dayGridMonth';
			},
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

	let previousTouch: Touch | undefined;

	function onTouchStart(event: TouchEvent) {
		previousTouch = event.touches[0];
	}

	function onTouchEnd(event: TouchEvent) {
		if (event.touches.length > 0 || previousTouch === undefined) {
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
	<div class="top">
		<slot
			name="top"
			previous={() => calendar?.prev()}
			next={() => calendar?.next()}
			today={() => calendar?.today()}
			todayDisabled={selectedMonth === currentMonth}
			{selectedMonth}
		></slot>
	</div>

	<div
		class="full-calendar no-pico"
		bind:this={calendarElement}
		on:touchstart|passive={onTouchStart}
		on:touchend|passive={onTouchEnd}
	>
		<div class="placeholder"></div>
	</div>

	<div class="bottom">
		<slot name="bottom"></slot>
	</div>
</div>

<style>
	.calendar-wrapper {
		margin: 0 auto;
		max-width: max(640px, calc((4 / 3) * (100lvh - (4.25rem + 104px))));
		display: grid;
		gap: 16px;
		margin-bottom: var(--pico-typography-spacing-vertical);
	}

	.full-calendar {
		font-size: min(18px, 0.75em);

		& .placeholder {
			aspect-ratio: 4/3;
		}
	}
</style>
