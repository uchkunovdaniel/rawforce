<script lang="ts">
	import '../app.css';
	import '../fonts.css'
	import favicon from '$lib/assets/favicon.svg';
	// import logo from "$lib/assets/logo.svg";

	let { children} = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<style>
	:global(body) {
        user-select: none;
    }
    :global(html) {
        overscroll-behavior: none;
    }
	:root {
		--pink: #FFBED2;
		--white: #FFF9FA;
		--black: #0F0326;
		--brown: #715445;
		--dark-pink: #D1587F;
		--blue: #C9F1FB;
	}
	:global(a:focus-visible) {
		border-radius: .5rem;
		padding: 0 .2rem 0 .2rem;
		line-height: 1rem;
		outline: 2px solid var(--white);
	}
	:global(button:focus-visible) {
		outline: 2px solid var(--white);
	}
	:global(a, button:enabled) {
		cursor: pointer;
	}
</style>