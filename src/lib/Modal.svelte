<script lang="ts">
	import type { Snippet } from 'svelte';
	const { children }: { children: Snippet } = $props();

	let dialog: HTMLDialogElement;

	export function open() {
		dialog.showModal();
	}

	export function close() {
		dialog.close();
	}
</script>

<dialog
	bind:this={dialog}
	onclick={(event) => {
		if (event.target === dialog) {
			close();
		}
	}}
>
	<article>
		{@render children()}
	</article>
</dialog>

<style>
	article > :global(:last-child) {
		margin-block-end: 0;
	}
</style>
