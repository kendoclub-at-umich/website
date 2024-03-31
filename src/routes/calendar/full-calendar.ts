import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

const calendarContainer = document.querySelector('#calendar-container')!;

const shadowDom = calendarContainer.attachShadow({ mode: 'open' });

const calendarElement = document.createElement('div');
shadowDom.appendChild(calendarElement);

const calendar = new Calendar(calendarElement, {
	plugins: [dayGridPlugin, listPlugin, googleCalendarPlugin],
	initialView: 'dayGridMonth',
	headerToolbar: {
		left: 'prev,next today',
		center: 'title',
		right: 'dayGridMonth,listWeek'
	},
	googleCalendarApiKey: 'AIzaSyDHUqblOxNndbN7jUXvoKy8IugKLlSXbkE',
	events: {
		googleCalendarId: 'c_1pcp6odi9qfe276tpuob8h00ms@group.calendar.google.com'
	}
});
calendar.render();
