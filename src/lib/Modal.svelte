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

<!-- Reason: Dialog can be closed with esc key, so it's already able to be interacted with -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions  -->
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
