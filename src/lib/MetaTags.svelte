<script lang="ts">
	import { page } from '$app/stores';
	import logoUrl from '$lib/logo.webp';

	const siteName = 'Kendo Club at the University of Michigan';
	const baseUrl = 'https://michigankendo.com';

	/**
	 * the single canonical url for this page
	 * ```ts
	 * "https://michigankendo.com"            => "https://michigankendo.com"
	 * "https://michigankendo.com/"           => "https://michigankendo.com"
	 * "https://michigankendo.com/about"      => "https://michigankendo.com/about"
	 * "https://michigankendo.com/about.html" => "https://michigankendo.com/about"
	 * "https://michigankendo.com/index.html" => "https://michigankendo.com"
	 * "https://kendoclub.netlify.app/about"  => "https://michigankendo.com/about"
	 * ```
	 */
	$: canonicalUrl = baseUrl + $page.url.pathname.replace(/\/?(index)?(\.html)?$/, '');

	/** The title of the page */
	export let title: string;

	/** A description of the page */
	export let description: string;
</script>

<link rel="icon" href={logoUrl} />
<link rel="canonical" href={canonicalUrl} />

<title>{$page.url.pathname == '/' ? title : title + ' | ' + siteName}</title>
<meta name="description" content={description} />
