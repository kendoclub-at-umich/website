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

	export let googleCalendarApiKey: string;
	export let googleCalendarId: string;

	let calendarContainer: HTMLDivElement;
	let calendar: Calendar | undefined;

	onMount(() => {
		const smallScreenQuery = matchMedia('(width < 768px)');

		const shadowDom = calendarContainer.attachShadow({ mode: 'open' });

		const styleSheet = new CSSStyleSheet();
		styleSheet.replaceSync(shadowCss);
		shadowDom.adoptedStyleSheets = [styleSheet];

		const calendarElement = document.createElement('div');
		shadowDom.appendChild(calendarElement);

		calendar = new Calendar(calendarElement, {
			plugins: [dayGridPlugin, listPlugin, googleCalendarPlugin],
			initialView: smallScreenQuery.matches ? 'listMonth' : 'dayGridMonth',
			headerToolbar: {
				left: 'prev,next today',
				center: 'title',
				right: 'dayGridMonth,listMonth'
			},
			footerToolbar: {
				left: 'addToGoogleCalendar'
			},
			customButtons: {
				addToGoogleCalendar: {
					text: 'Add to Google Calendar',
					click: () => {
						window.open('https://calendar.google.com/calendar/r?cid=' + googleCalendarId, '_blank');
					}
				}
			},
			googleCalendarApiKey,
			events: { googleCalendarId },
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
</script>

<div id="calendar-container" bind:this={calendarContainer} />

<style>
	:global(main:has(#calendar-container)) {
		max-width: none;
	}

	#calendar-container {
		margin: 0 auto;
		font-size: min(18px, 0.75em);
		max-width: max(640px, calc((4 / 3) * (100lvh - 225px)));
	}
</style>
