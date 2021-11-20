<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import { Image } from '@joeinnes/svelte-image';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	export let item = { name: '', title: '', summary: '', cta_text: '', image: '' };
	let clientWidth = 0;
	let clientHeight = 0;
	$: aspectRatio = clientWidth + '/' + clientHeight;
</script>

<div class="w-full rounded carousel-item">
	<div
		class="grid w-full h-full grid-cols-1 mx-4 overflow-hidden shadow-xl md:mx-12 lg:grid-cols-2 bg-base-100 rounded-box"
	>
		<div class="w-full" bind:clientWidth bind:clientHeight>
			<Image
				src="https://api.traist.co.uk/assets/{item.image}.jpg"
				alt={item.title}
				{aspectRatio}
			/>
		</div>
		<div class="flex flex-col justify-center p-4 pt-2 md:p-8 md:pt-2">
			<h1 class="mb-4 text-3xl font-bold md:text-6xl">{item.title}</h1>
			<div class="mb-8 prose md:prose-xl"><SvelteMarkdown source={item.summary} /></div>
			<div>
				<a href="/{item.name}" class="font-normal normal-case md:text-xl btn btn-primary"
					>{item.cta_text}</a
				>
			</div>
		</div>
	</div>
</div>
