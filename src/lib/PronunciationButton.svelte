<script lang="ts">
	import { mdiLoading, mdiVolumeHigh } from '@mdi/js';
	import SvgIcon from './SvgIcon.svelte';

	const { text }: { text: string } = $props();

	let audioElement: HTMLAudioElement;

	let loaded = $state(false);
	let playing = $state(false);
</script>

<button
	class:playing
	class:loaded
	aria-label="Pronunciation"
	onclick={() => {
		void audioElement.play();
		playing = true;
	}}
>
	{#if !loaded && playing}
		<SvgIcon spin={true} label="" path={mdiLoading}></SvgIcon>
	{:else}
		<SvgIcon label="" path={mdiVolumeHigh}></SvgIcon>
	{/if}
</button>
<audio
	bind:this={audioElement}
	preload="none"
	src="/api/pronunciation?{new URLSearchParams({ text })}"
	oncanplaythrough={() => {
		loaded = true;
	}}
	onended={() => {
		playing = false;
	}}
>
</audio>

<style>
	button {
		border-radius: 50%;
		appearance: none;
		background: none;
		border: none;
		color: inherit;
		margin: -6px;
	}

	.playing.loaded {
		color: red;
	}
</style>
