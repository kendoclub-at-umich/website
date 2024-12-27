<script lang="ts">
	const { label, path }: { label: string; path: string } = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	height="24px"
	width="24px"
	viewBox="0 0 24 24"
	role="img"
	aria-label={label}
>
	<path fill="currentColor" d={path} />
</svg>

<style>
	:global(button:has(> svg[viewBox='0 0 24 24'])) {
		padding: var(--pico-form-element-spacing-vertical);
		display: grid;
		grid-auto-flow: column;
		place-content: center;
		align-items: center;
		gap: 8px;
	}
</style>
