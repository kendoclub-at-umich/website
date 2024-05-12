<script>
	import '$lib/styles.scss';
	import { page } from '$app/stores';
	import logo from './logo.webp';
</script>

<svelte:head>
	<link rel="canonical" href="https://websites.umich.edu/~kendoclub{$page.url.pathname}" />
</svelte:head>

<header>
	<div class="container">
		<nav>
			<ul>
				<li>
					<a href="/" class="brand contrast"><img src={logo} alt="" />Kendo Club at Umich</a>
				</li>
			</ul>
			<ul>
				<li><a href="/calendar">Calendar</a></li>
				<li><a href="/about">About</a></li>
				<li><a href="/contact">Contact Us</a></li>
			</ul>
		</nav>
	</div>
</header>

<main class="container">
	<slot />
</main>

<style>
	header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: light-dark(#ffffff, #001c39);
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
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

	main {
		margin-top: calc(var(--font-size) * 2.25 + var(--nav-element-spacing-vertical) * 2);
		padding-top: var(--font-size);
	}
</style>
