<script lang="ts">
	import { fly } from 'svelte/transition';
	let y = 0;
	let windowHeight = 0;
	let display = false;
	const scrollToTop = () => (y = 0);
	$: {
		display = y > windowHeight / 2;
	}
</script>

<svelte:window bind:scrollY={y} bind:innerHeight={windowHeight} />
{#if display}
	<div
		class="w-10 h-10 p-1 bg-base-300 fixed bottom-4 right-0 border-primary border-l border-t border-b text-primary-content cursor-pointer hover:text-neutral transition-colors duration-200"
		on:click={scrollToTop}
		transition:fly={{ x: 100, duration: 800 }}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-full w-full"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
		</svg>
	</div>
{/if}
