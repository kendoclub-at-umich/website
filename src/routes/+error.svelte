<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} | Kendo Club at the University of Michigan</title>
</svelte:head>

<h1><span class="primary-color">{$page.status}</span> {$page.error?.message}</h1>

<style>
	h1 {
		margin-top: 20svh;
		text-align: center;
	}

	.primary-color {
		color: var(--pico-primary);
	}
</style>
