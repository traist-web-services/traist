<script lang="ts">
	import CarouselItem from '$lib/components/CarouselItem.svelte';
	export let items;
	const itemsArr = Object.keys(items)
		.map((key) => items[key])
		.sort((a, b) => a.sort - b.sort);
</script>

{#each itemsArr as item, index (item.id)}
	<div
		class="relative w-full min-h-screen p-2 py-6 carousel md:p-6 lg:p-12 xl:p-24"
		class:bg-primary={index % 2 === 0}
	>
		<CarouselItem {item} />
	</div>
{/each}
