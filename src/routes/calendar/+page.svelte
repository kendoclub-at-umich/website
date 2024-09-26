<script lang="ts">
	import MetaTags from '$lib/MetaTags.svelte';
	import FullCalendar from '$lib/FullCalendar.svelte';
</script>

<svelte:head>
	<MetaTags
		title="Calendar"
		description="Club practice times and information about upcoming kendo events."
	/>
</svelte:head>

<FullCalendar
	googleCalendarApiKey="AIzaSyDHUqblOxNndbN7jUXvoKy8IugKLlSXbkE"
	googleCalendarId="c_1pcp6odi9qfe276tpuob8h00ms@group.calendar.google.com"
/>
