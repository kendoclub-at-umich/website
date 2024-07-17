<script lang="ts">
	import FullCalendar from '$lib/FullCalendar.svelte';
</script>

<svelte:head>
	<title>Calendar | Kendo Club at the University of Michigan</title>
	<meta
		name="description"
		content="View the club's practice days, times, and locations, as well as upcoming kendo events in the area. "
	/>
</svelte:head>

<FullCalendar
	googleCalendarApiKey="AIzaSyDHUqblOxNndbN7jUXvoKy8IugKLlSXbkE"
	googleCalendarId="c_1pcp6odi9qfe276tpuob8h00ms@group.calendar.google.com"
/>
