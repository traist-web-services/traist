<script lang="ts">
	import { leftPad } from '$lib/utilities';
	export let mainNav = [];
</script>

<main class="md:h-gr2 flex flex-col md:flex-row items-center justify-between">
	<div
		class="w-full flex flex-col items-center md:w-gr2 text-5xl lg:text-9xl font-bold p-5 border-r h-full justify-center"
	>
		<h1>Your business.</h1>
		<h2>Our solutions.</h2>
	</div>
	<div class="h-full w-full lg:w-gr1 flex px-5 items-center justify-center lg:bg-base-200">
		<div class="pl-6 lg:text-5xl lg:w-full">
			<ol class="lg:w-full">
				{#each mainNav as navItem, index}
					<li class="py-2 lg:py-4 group">
						<a
							href={navItem.link}
							class="border-l-4 lg:border-l-8 pl-1 group-hover:border-primary transition-colors flex items-center"
							><span class="rotated hidden lg:inline">{leftPad(index + 1, 2)}</span><span
								class="inline lg:hidden">{leftPad(index + 1, 2)}</span
							>
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
