<script lang="ts">
	let dialog: HTMLDialogElement;

	export function open() {
		dialog.showModal();
	}

	export function close() {
		dialog.close();
	}
</script>

<!-- Reason: Dialog can be closed with esc key, so it's already able to be interacted with -->
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:click|self={close}>
	<article>
		<slot></slot>
	</article>
</dialog>

<style>
	article > :global(:last-child) {
		margin-block-end: 0;
	}
</style>
