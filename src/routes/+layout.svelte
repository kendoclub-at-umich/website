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

<footer class="container">
	<span>&copy; {copyright}</span>
	<span>
		Code available on
		<a class="contrast" href="https://github.com/kendoclub-at-umich/website">Github</a>
	</span>
</footer>

<style>
	:global(body) {
		min-height: 100dvh;
		display: grid;
		grid-template-rows: auto minmax(auto, 1fr) auto;
		grid-template-columns:
			max(var(--pico-spacing), env(safe-area-inset-left))
			minmax(0, 1fr)
			max(var(--pico-spacing), env(safe-area-inset-right));
	}

	:global(.container) {
		grid-column: 2 / -2;
		justify-self: center;
		width: min(40rem, 75dvw + 120px, 100%);
	}

	@media print {
		:global(body) {
			grid-template-columns: 0 minmax(0, 1fr) 0;
		}
		:global(.container) {
			width: 100%;
		}
	}

	main {
		padding-top: 32px;
	}

	footer {
		display: flex;
		justify-content: space-between;
		padding-top: calc(var(--pico-spacing) / 2);
		padding-bottom: max(var(--pico-spacing) / 2, env(safe-area-inset-bottom));
		font-weight: 200;
		font-size: 0.75em;
	}

	@media (width<480px) {
		footer {
			flex-direction: column;
		}
	}
</style>
