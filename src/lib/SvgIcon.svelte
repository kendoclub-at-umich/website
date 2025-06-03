<script lang="ts">
	const { label, path, spin = false }: { label: string; path: string; spin?: boolean } = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	height="24px"
	width="24px"
	viewBox="0 0 24 24"
	role="img"
	aria-label={label}
	class:spin
>
	<path fill="currentColor" d={path} />
</svg>

<style>
	@keyframes spin {
		0% {
			rotate: 0deg;
		}
		100% {
			rotate: 360deg;
		}
	}

	.spin {
		animation: spin linear 0.75s infinite;
	}

	:global(button:has(> svg[viewBox='0 0 24 24'])) {
		padding: var(--pico-form-element-spacing-vertical);
		display: grid;
		grid-auto-flow: column;
		place-content: center;
		align-items: center;
		gap: 8px;
	}
</style>
