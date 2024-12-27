<script lang="ts">
	import { page } from '$app/state';
	import MetaTags from '$lib/MetaTags.svelte';

	const errorMessage = $derived(page.error?.message ?? 'Unknown error!');
</script>

<svelte:head>
	<MetaTags title={String(page.status)} description={errorMessage} />
</svelte:head>

<h1>
	<span class="status-code">{page.status}</span>
	<span class="error-message">{errorMessage}</span>
</h1>

<style>
	h1 {
		margin-top: 20svh;
		text-align: center;
	}

	.status-code {
		color: var(--pico-primary);
	}

	.error-message {
		font-weight: 400;
	}
</style>
