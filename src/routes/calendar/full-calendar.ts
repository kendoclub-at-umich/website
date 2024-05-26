import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import css from './full-calendar.css?inline';

const smallScreenQuery = matchMedia('(width < 768px)');

const calendarContainer = document.querySelector('#calendar-container')!;

const shadowDom = calendarContainer.attachShadow({ mode: 'open' });

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(css);
shadowDom.adoptedStyleSheets = [styleSheet];

const calendarElement = document.createElement('div');
shadowDom.appendChild(calendarElement);

const calendar = new Calendar(calendarElement, {
	plugins: [dayGridPlugin, listPlugin, googleCalendarPlugin],
	initialView: smallScreenQuery.matches ? 'listMonth' : 'dayGridMonth',
	headerToolbar: {
		left: 'prev,next today',
		center: 'title',
		right: 'dayGridMonth,listMonth'
	},
	googleCalendarApiKey: 'AIzaSyDHUqblOxNndbN7jUXvoKy8IugKLlSXbkE',
	events: {
		googleCalendarId: 'c_1pcp6odi9qfe276tpuob8h00ms@group.calendar.google.com'
	}
});
calendar.render();
