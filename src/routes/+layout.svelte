<script>
	import '$lib/styles.scss';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<link rel="canonical" href="https://websites.umich.edu/~kendoclub{$page.url.pathname}" />
</svelte:head>

<main class="container">
	<slot />
</main>
