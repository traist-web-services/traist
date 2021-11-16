<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import { Image } from '@joeinnes/svelte-image';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	export let item = { name: '', title: '', summary: '', cta_text: '', image: '' };
	let clientWidth = 0;
	let clientHeight = 0;
</script>

<div
	class="w-full carousel-item"
	in:fly={{ x: 1000, duration: 2000, easing: quintOut }}
	out:fly={{ x: -1000, duration: 500, easing: quintOut }}
>
	<div class="grid w-full h-full grid-cols-2 mx-12 overflow-hidden bg-base-100 rounded-box">
		<div bind:clientWidth bind:clientHeight>
			<Image
				src="https://api.traist.co.uk/assets/{item.image}.jpg"
				alt={item.title}
				aspectRatio={clientWidth + '/' + clientHeight}
			/>
		</div>
		<div class="flex flex-col justify-center p-8">
			<h1 class="mb-4 text-6xl font-bold">{item.title}</h1>
			<div class="mb-8 prose prose-xl"><SvelteMarkdown source={item.summary} /></div>
			<div>
				<a href="/{item.name}" class="text-xl font-normal normal-case btn btn-primary"
					>{item.cta_text}</a
				>
			</div>
		</div>
	</div>
</div>
