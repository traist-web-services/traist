<script lang="ts">
	import { Image } from '@joeinnes/svelte-image';
	import { leftPad } from '$lib/utilities';
	import SvelteMarkdown from 'svelte-markdown';
	export let service = {
		name: '',
		title: '',
		summary: '',
		image: '',
		cta_text: ''
	};
	export let index = 0;
</script>

<div class="lg:h-screen w-full bg-base-100 p-5 lg:p-0 border-b lg:border-0" id={service.name}>
	<div class="h-gr1 flex w-full items-end" class:flex-row-reverse={index % 2}>
		<div
			class="w-full lg:w-gr1 flex text-4xl lg:text-5xl font-bold py-5 justify-start {index % 2
				? 'lg:justify-start'
				: 'lg:justify-end'}"
		>
			<a href="/{service.name}">{leftPad(index + 1, 2)}. {service.title}</a>
		</div>
	</div>
	<section class="h-gr2 flex flex-col {index % 2 ? 'lg:flex-row-reverse' : 'lg:flex-row'}">
		<div class="w-full lg:w-gr1 h-full ">
			<div style="aspect-ratio: 1/1">
				<Image
					src="https://api.traist.co.uk/assets/{service.image}?file.jpg"
					aspectRatio="1/1"
					alt={service.title}
				/>
			</div>
		</div>
		<div class="w-full lg:w-gr2 py-5 lg:p-5 h-full">
			<div class="prose lg:prose-xl">
				<SvelteMarkdown source={service.summary} />
			</div>
			<div class="mt-6">
				<a
					href="/{service.name}"
					class="bg-primary hover:bg-primary-focus text-primary-content px-2 py-2 transition-colors duration-200 text-xl"
					>{service.cta_text}</a
				>
			</div>
		</div>
	</section>
</div>
