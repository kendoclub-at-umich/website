<script lang="ts">
	import { page } from '$app/stores';
	import logoUrl from '$lib/logo/any.svg';
	import defaultImageUrl from '../routes/(home)/combat-kamae-position.jpg?w=1200&h=630&format=webp';

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

	type Image = {
		/** the URL of the image */
		readonly url: string;
		/** The alt text for the image */
		readonly alt: string;
	};

	/** An image to display in link previews */
	export let image: Image = {
		url: defaultImageUrl,
		alt: 'Two club members in kendo armor holding bamboo practice swords, facing each other in the ready position.'
	};

	$: fullImageUrl = new URL(image.url, baseUrl).href;

	type ExtraInfo =
		| {
				/** The Open graph type of the page */
				type: 'website';
		  }
		| {
				/** The Open graph type of the page */
				type: 'article';
				/** Writers of the article */
				readonly author: string;
				/** When the article was first published */
				readonly publishedTime: Date;
		  };

	/** Extra information about the page depending on what type of page it is */
	export let extraInfo: ExtraInfo = { type: 'website' };
</script>

<link rel="icon" href={logoUrl} />
<link rel="canonical" href={canonicalUrl} />

<title>{$page.url.pathname === '/' ? title : title + ' | ' + siteName}</title>
<meta name="description" content={description} />

<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:type" content={extraInfo.type} />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:image" content={fullImageUrl} />
<meta property="og:image:alt" content={image.alt} />

{#if extraInfo.type === 'article'}
	<meta property="og:article:author" content={extraInfo.author} />
	<meta property="og:article:published_time" content={extraInfo.publishedTime.toISOString()} />
{/if}
