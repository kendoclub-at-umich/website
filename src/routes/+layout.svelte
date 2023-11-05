<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<link rel="canonical" href="https://websites.umich.edu/~kendoclub{$page.url.pathname}" />
</svelte:head>

<slot />
