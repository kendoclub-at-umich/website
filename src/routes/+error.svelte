<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} | Kendo Club at the University of Michigan</title>
</svelte:head>

<h1>
	<span class="status-code">{$page.status}</span>
	<span class="error-message">{$page.error?.message}</span>
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
