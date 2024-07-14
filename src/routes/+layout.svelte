<script lang="ts">
	import '$lib/styles.scss';
	import { page } from '$app/stores';
	import Navbar from '$lib/Navbar.svelte';
	import logoUrl from './logo.webp';
	import copyright from 'license-copyright';

	const pages = [
		{ name: 'Calendar', url: '/calendar' },
		{ name: 'About Us', url: '/about' },
		{ name: 'FAQ', url: '/faq' },
		{ name: 'Resources', url: '/resources' }
	] as const;

	/**
	 * @param url the url of the page
	 * @returns the single canonical url for this page
	 * @example ```ts
	 * "https://michigankendo.com"            => "https://michigankendo.com"
	 * "https://michigankendo.com/"           => "https://michigankendo.com"
	 * "https://michigankendo.com/about"      => "https://michigankendo.com/about"
	 * "https://michigankendo.com/about.html" => "https://michigankendo.com/about"
	 * "https://michigankendo.com/index.html" => "https://michigankendo.com"
	 * "https://kendoclub.netlify.app/about"  => "https://michigankendo.com/about"
	 * ```
	 */
	function getCanonicalUrl(url: URL) {
		return `https://michigankendo.com${url.pathname.replace(/\/?(index)?(\.html)?$/, '')}`;
	}
</script>

<svelte:head>
	<link rel="icon" href={logoUrl} />
	<link rel="canonical" href={getCanonicalUrl($page.url)} />
</svelte:head>

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
