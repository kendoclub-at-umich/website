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

	/** The url of an image to display in link previews */
	export let imageUrl: string;
	$: fullImageUrl = new URL(imageUrl, baseUrl).href;

	/** The alt text for `imageUrl` */
	export let imageAlt: string;

	/** The Open graph type of the page */
	export let type: 'website' | 'article' = 'website';
</script>

<link rel="icon" href={logoUrl} />
<link rel="canonical" href={canonicalUrl} />

<title>{$page.url.pathname === '/' ? title : title + ' | ' + siteName}</title>
<meta name="description" content={description} />

<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:type" content={type} />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:image:url" content={fullImageUrl} />
<meta property="og:image:alt" content={imageAlt} />
