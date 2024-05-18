<script lang="ts">
	import { page as currentPage } from '$app/stores';

	export let logoUrl: string;
	export let siteName: string;
	type Page = { name: string; url: string };
	export let pages: readonly Page[];
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
				{#each pages as page}
					<li>
						<a
							href={page.url}
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
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: color-mix(in lab, var(--pico-background-color) 90%, transparent);
		backdrop-filter: blur(12px);
		box-shadow:
			0 3px 6px rgba(0, 0, 0, 0.16),
			0 3px 6px rgba(0, 0, 0, 0.23);
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

	header + :global(*) {
		margin-top: calc(var(--font-size) * 2.25 + var(--nav-element-spacing-vertical) * 2);
		padding-top: var(--font-size);
	}
</style>
