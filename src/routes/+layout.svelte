<script lang="ts">
	import '$lib/styles.scss';
	import Navbar from '$lib/Navbar.svelte';
	import logoUrl from '$lib/logo.webp';
	import copyright from 'license-copyright';

	const pages = [
		{ name: 'Calendar', url: '/calendar' },
		{ name: 'About Us', url: '/about' },
		{ name: 'FAQ', url: '/faq' },
		{ name: 'Resources', url: '/resources' }
	] as const;
</script>

<Navbar {logoUrl} siteName="Kendo Club at Umich" {pages} />

<main class="container">
	<slot />
</main>

<footer>
	<div class="container">
		<span>&copy; {copyright}</span>
		<span>
			Code available on
			<a class="contrast" href="https://github.com/kendoclub-at-umich/website">Github</a>
		</span>
	</div>
</footer>

<style>
	:global(body) {
		min-height: 100dvh;
		display: grid;
		grid-template-rows: auto minmax(auto, 1fr) auto;
	}

	main {
		padding-top: 32px;
		padding-bottom: env(safe-area-inset-bottom);
	}

	footer > div {
		display: flex;
		justify-content: space-between;
		padding-block: calc(var(--pico-spacing) / 2);
		font-weight: 200;
		font-size: 0.75em;
	}

	@media (width<480px) {
		footer > div {
			flex-direction: column;
		}
	}
</style>
