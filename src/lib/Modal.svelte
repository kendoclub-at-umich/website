<script lang="ts">
	import { browser } from '$app/environment';

	export let open: boolean;

	let dialog: HTMLDialogElement;

	$: browser && open && dialog.showModal();
</script>

<!-- Reason: Dialog can be closed with esc key, so it's already able to be interacted with -->
<!-- svelte-ignore a11y-click-events-have-key-events  a11y-no-noninteractive-element-interactions-->
<dialog
	bind:this={dialog}
	on:close={() => (open = false)}
	on:click={(event) => {
		if (event.target == dialog) {
			dialog.close();
		}
	}}
>
	<article>
		<slot></slot>
	</article>
</dialog>
