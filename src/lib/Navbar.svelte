<script lang="ts">
	import { page as currentPage } from '$app/stores';
	import { mdiMenu, mdiClose } from '@mdi/js';

	export let logoUrl: string;
	export let siteName: string;
	type Page = { name: string; url: string };
	export let pages: readonly Page[];

	let menuExpanded = false;
</script>

<header>
	<div class="container">
		<nav>
			<ul>
				<li>
					<a href="/" class="brand contrast"><img src={logoUrl} alt="" />{siteName}</a>
				</li>
			</ul>
			<ul>
				<li>
					<button
						aria-label={menuExpanded ? 'Close' : 'Menu'}
						on:click={() => (menuExpanded = !menuExpanded)}
					>
						<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24">
							<path fill="currentColor" d={menuExpanded ? mdiClose : mdiMenu} />
						</svg>
					</button>
				</li>
			</ul>
			<ul class="menu" class:expanded={menuExpanded}>
				{#each pages as page}
					<li>
						<a
							href={page.url}
							on:click={() => (menuExpanded = false)}
							aria-current={$currentPage.url.pathname == page.url ? 'page' : undefined}
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
	header {
		position: sticky;
		z-index: 2;
		top: 0;
		left: 0;
		right: 0;
		background-color: color-mix(in lab, var(--pico-background-color) 90%, transparent);
		backdrop-filter: blur(12px);
		box-shadow:
			0 3px 6px rgba(0, 0, 0, 0.16),
			0 3px 6px rgba(0, 0, 0, 0.23);
		transition: background-color 0.1s linear;
	}

	.brand {
		display: grid;
		grid-template-columns: auto auto;
		align-items: center;
		gap: 8px;
		font-size: 1.5em;
		font-weight: 700;

		& > img {
			height: 1lh;
		}
	}

	@media (width >= 1024px) {
		ul:has(button) {
			display: none;
		}
	}

	@media (width < 1024px) {
		li:has(button) {
			padding: 0;
		}

		button {
			appearance: none;
			background: none;
			border: none;
			display: grid;
			place-items: center;
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
				opacity 0.1s linear,
				visibility 0.1s linear;
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
			transition: transform 0.1s ease-out;
		}

		.menu:not(.expanded) a {
			transform: translateY(-12px);
			transition: transform 0.1s ease-in;
		}

		.menu a[aria-current] {
			font-weight: 700;
		}
	}
</style>
