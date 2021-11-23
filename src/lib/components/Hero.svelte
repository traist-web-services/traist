<script lang="ts">
	import { leftPad } from '$lib/utilities';
	export let mainNav = [];
	let screenWidth = 0;
</script>

<svelte:window bind:innerWidth={screenWidth} />
<main class="md:h-gr2 flex flex-col md:flex-row items-center justify-between relative">
	<div
		class="w-full flex flex-col items-center md:w-gr2 text-5xl lg:text-9xl font-bold p-5 h-full justify-center text-neutral-focus"
		style="font-size: max(8.2vw, 2.2rem)"
	>
		<h1>Your business.</h1>
		<h2>Our solutions.</h2>
	</div>
	<div
		class="w-full md:w-gr1 flex px-5 items-center justify-center lg:bg-base-200 lg:border-l lg:border-t lg:border-b"
	>
		<div class="pl-6 lg:w-full" style="font-size: max(2.2vw,1.2rem)">
			<ol class="lg:w-full">
				{#each mainNav as navItem, index}
					<li class="py-2 lg:py-4 group">
						<a
							href={navItem.link}
							class="border-l-4 lg:border-l-8 pl-1 group-hover:border-primary transition-colors flex items-center"
						>
							<span class="rotated hidden lg:inline">
								{leftPad(index + 1, 2)}
							</span>
							<span class="inline lg:hidden">
								{leftPad(index + 1, 2)}
							</span>
							<span class="pl-2 lg:pl-8 w-full">{navItem.label}</span></a
						>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</main>

<style>
	.rotated {
		writing-mode: vertical-rl;
	}
</style>
