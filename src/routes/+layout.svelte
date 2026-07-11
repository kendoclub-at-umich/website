<script lang="ts">
	import '$lib/styles.scss';
	import Navbar from '$lib/Navbar.svelte';
	import logoUrl from '$lib/logo/any.svg';
	import copyright from 'license-copyright';
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();

	const pages = [
		{ name: 'Calendar', url: '/calendar' },
		{ name: 'About Us', url: '/about' },
		{ name: 'FAQ', url: '/faq' },
		{ name: 'Resources', url: '/resources' }
	] as const;
</script>

<Navbar {logoUrl} siteName="Kendo Club at Umich" {pages} />

<main class="container">
	{@render children()}
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
	}

	footer > div {
		display: flex;
		justify-content: space-between;
		padding-top: calc(var(--pico-spacing) / 2);
		padding-bottom: max(var(--pico-spacing) / 2, env(safe-area-inset-bottom));
		font-weight: 200;
		font-size: 0.75em;
	}

	@media (width<480px) {
		footer > div {
			flex-direction: column;
		}
	}
</style>
