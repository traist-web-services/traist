<script lang="ts">
	import CarouselItem from '$lib/components/CarouselItem.svelte';
	export let items;
	let paused = false;
	let currentSlide = 0;
	const itemsArr = Object.keys(items)
		.map((key) => items[key])
		.sort((a, b) => a.sort - b.sort);

	const getNextSlide = () => {
		if (currentSlide === itemsArr.length - 1) {
			currentSlide = 0;
		} else {
			currentSlide++;
		}
	};

	// This works, but basically just runs every 10 seconds, so if you hover for 9s, then in 1s time, the carousel will rotate, and vice versa. Ideally maybe carousel would rotate 2s after mouseout, but it's a bit awkward to implement.
	// TODO: Improve carousel behaviour
	const interval = setInterval(() => {
		if (!paused) {
			getNextSlide();
		}
	}, 10000);
</script>

<div
	class="relative w-full min-h-screen p-2 carousel bg-primary md:p-6 lg:p-12 xl:p-24"
	on:mouseover={() => (paused = true)}
	on:focus={() => (paused = true)}
	on:mouseout={() => (paused = false)}
	on:blur={() => (paused = false)}
>
	{#each itemsArr as item, index (item.id)}
		{#if currentSlide === index}
			<CarouselItem {item} />
		{/if}
	{/each}
	<div class="absolute bottom-0 transform left-1/2 -translate-x-2/4">
		<div class="flex justify-center w-full py-4 space-x-2">
			{#each itemsArr as item, index (item.id)}
				<button
					class="transition-colors border-2 btn btn-xs btn-circle border-base-100"
					class:btn-accent={index === currentSlide}
					on:click={() => (currentSlide = index)}>&nbsp;</button
				>
			{/each}
		</div>
	</div>
</div>
