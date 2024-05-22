<script lang="ts">
	import '$lib/styles.scss';
	import { page } from '$app/stores';
	import Navbar from '$lib/Navbar.svelte';
	import logoUrl from './logo.webp';

	const pages = [
		{ name: 'Calendar', url: '/calendar' },
		{ name: 'About Us', url: '/about' },
		{ name: 'Contact Us', url: '/contact' }
	] as const;
</script>

<svelte:head>
	<link rel="canonical" href="https://websites.umich.edu/~kendoclub{$page.url.pathname}" />
</svelte:head>

<Navbar {logoUrl} siteName="Kendo Club at Umich" {pages} />

<main class="container">
	<slot />
</main>

<style>
	main {
		padding-top: 32px;
	}
</style>
