<script lang="ts">
	import { page as currentPage } from '$app/state';
	import { mdiMenu, mdiClose } from '@mdi/js';
	import { onMount } from 'svelte';
	import SvgIcon from './SvgIcon.svelte';

	type Page = { name: string; url: string };

	const {
		logoUrl,
		siteName,
		pages
	}: {
		logoUrl: string;
		siteName: string;
		pages: readonly Page[];
	} = $props();

	let menuExpanded = $state(false);

	$effect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions -- makes the effect run every time the route changes
		currentPage.route;
		menuExpanded = false;
	});

	let elevated = $state(false);

	function checkIfElevated() {
		elevated = window.scrollY >= 1;
	}

	onMount(checkIfElevated);
</script>

<svelte:document onscroll={checkIfElevated} />

<header class:elevated>
	<div class="container">
		<nav>
			<ul>
				<li>
					<a href="/" class="brand contrast" onclick={() => (menuExpanded = false)}>
						<img src={logoUrl} alt="" />{siteName}
					</a>
				</li>
			</ul>
			<ul>
				<li>
					<button
						aria-label={menuExpanded ? 'Close' : 'Menu'}
						onclick={() => (menuExpanded = !menuExpanded)}
					>
						<SvgIcon label="" path={menuExpanded ? mdiClose : mdiMenu} />
					</button>
				</li>
			</ul>
			<ul class="menu" class:expanded={menuExpanded}>
				{#each pages as page (page.url)}
					<li>
						<a
							href={page.url}
							onclick={() => (menuExpanded = false)}
							aria-current={currentPage.url.pathname === page.url ? 'page' : undefined}
						>
							{page.name}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</header>

<style>
	.container {
		padding-top: env(safe-area-inset-top);
	}

	header {
		--menu-transition-time: 0.1s;
		position: sticky;
		z-index: 3;
		top: 0;
		left: 0;
		right: 0;
		background-color: var(--pico-background-color);
		transition:
			background-color var(--menu-transition-time) linear,
			box-shadow var(--menu-transition-time) linear;
	}

	header.elevated {
		background-color: var(--elevated-background-color);
		backdrop-filter: blur(18px);
		-webkit-backdrop-filter: blur(18px);
		box-shadow: var(--box-shadow-md);
	}

	.brand {
		display: grid;
		grid-template-columns: auto auto;
		align-items: center;
		gap: 8px;
		font-size: 1.5em;
		font-weight: 700;

		& > img {
			aspect-ratio: 1;
			height: 1lh;
		}
	}

	@media (width >= 768px) {
		ul:has(button) {
			display: none;
		}
	}

	@media (width < 768px) {
		li:has(button) {
			padding: 0;
		}

		button {
			appearance: none;
			background: none;
			border: none;
			color: inherit;
			margin: -6px;
		}

		:global(:root):has(.menu.expanded) {
			overflow: hidden;
		}

		header:has(.menu.expanded) {
			background-color: var(--pico-background-color);
		}

		.menu {
			display: block;
			margin: 0;
			position: absolute;
			top: 100%;
			bottom: calc(100% - 100dvh);
			left: 0;
			right: 0;
			background-color: var(--pico-background-color);
			transition:
				opacity var(--menu-transition-time) linear,
				visibility var(--menu-transition-time) linear;
			animation: hide var(--menu-transition-time);
		}

		.menu:not(.expanded) {
			opacity: 0;
			visibility: hidden;
		}

		.menu li {
			display: contents;
		}

		.menu a {
			display: block;
			margin: 0;
			padding: 12px 0;
			font-size: 1.5em;
			text-align: center;
			transition: transform var(--menu-transition-time) ease-out;
		}

		.menu:not(.expanded) a {
			transform: translateY(-12px);
			transition: transform var(--menu-transition-time) ease-in;
		}

		.menu a[aria-current] {
			font-weight: 700;
		}
	}

	@media print {
		header {
			position: relative;
		}

		header.elevated {
			box-shadow: none;
		}

		ul:not(:has(.brand)) {
			display: none;
		}
	}

	/*
	 * This animation makes something fully hidden for the entire duration.
	 * This is useful for disabling the fade in transition when the browser is resized.
	 */
	@keyframes hide {
		from {
			visibility: hidden;
		}
		to {
			visibility: hidden;
		}
	}
</style>
