<script lang="ts">
	import { mount, onDestroy, onMount, unmount, type Snippet } from 'svelte';
	import { Calendar, type EventInput, type EventSourceFuncArg } from '@fullcalendar/core';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import listPlugin from '@fullcalendar/list';
	import GoogleCalendarEventFetcher from 'google-calendar-event-fetcher';
	import './full-calendar.css';
	import tippy, { type ReferenceElement } from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import './tippy-theme.css';
	import EventInfo from './EventInfo.svelte';

	type TopSnippetArgs = {
		previous: () => void;
		next: () => void;
		today: () => void;
		todayDisabled: boolean;
		selectedMonth: string;
	};

	let {
		googleCalendarApiKey,
		googleCalendarId,
		selectedView = $bindable(),
		top,
		bottom
	}: {
		googleCalendarApiKey: string;
		googleCalendarId: string;
		selectedView: 'listMonth' | 'dayGridMonth' | undefined;
		top: Snippet<[TopSnippetArgs]>;
		bottom: Snippet;
	} = $props();

	let calendarElement: HTMLDivElement;
	let calendar: Calendar | undefined = $state();
	let selectedMonth = $state('');
	let currentMonth = $state('');

	$effect(() => {
		if (calendar !== undefined && selectedView !== undefined) {
			calendar.changeView(selectedView);
		}
	});

	const englishMonthFormatter = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		year: 'numeric'
	});

	onMount(() => {
		const smallScreenQuery = matchMedia('(width < 768px)');

		currentMonth = englishMonthFormatter.format(new Date());
		selectedMonth = currentMonth;

		const googleCalendarEventFetcher = new GoogleCalendarEventFetcher<EventInput>({
			apiKey: googleCalendarApiKey,
			calendarId: googleCalendarId,
			transform: ({ summary, description, start, end, location, attachments }) => ({
				title: summary,
				allDay: 'date' in start,
				start: 'date' in start ? start.date : start.dateTime,
				end: 'date' in end ? end.date : end.dateTime,
				extendedProps: { attachments, description, location }
			})
		});

		calendar = new Calendar(calendarElement, {
			plugins: [dayGridPlugin, listPlugin],
			initialView: smallScreenQuery.matches ? 'listMonth' : 'dayGridMonth',
			headerToolbar: false,
			events: ({ start, end }: EventSourceFuncArg) =>
				googleCalendarEventFetcher.fetchEvents(start, end),
			aspectRatio: 4 / 3,
			datesSet: () => {
				selectedMonth = englishMonthFormatter.format(calendar?.getDate());
			},
			viewDidMount: ({ view }) => {
				selectedView = view.type as 'listMonth' | 'dayGridMonth';
			},
			eventDidMount: ({ el, event }) => {
				let component: Record<string, unknown> | undefined;
				el.setAttribute('tabindex', '0');

				tippy(el, {
					interactive: true,
					appendTo: document.body,
					placement: 'auto',
					theme: 'kendo',
					hideOnClick: false,
					onShow: (instance) => {
						const container = document.createElement('div');
						component = mount(EventInfo, { target: container, props: { event } });
						instance.setContent(container);
					},
					onHidden: () => {
						if (component !== undefined) {
							void unmount(component);
						}
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
</script>

<div class="calendar-wrapper">
	<div class="top">
		{@render top({
			previous: () => calendar?.prev(),
			next: () => calendar?.next(),
			today: () => calendar?.today(),
			todayDisabled: selectedMonth === currentMonth,
			selectedMonth
		})}
	</div>

	<div class="full-calendar no-pico" bind:this={calendarElement}>
		<div class="placeholder"></div>
	</div>

	<div class="bottom">
		{@render bottom()}
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
