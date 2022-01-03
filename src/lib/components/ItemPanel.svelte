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

<section
	class="lg:h-screen w-full bg-base-100 grid place-items-center pb-8 lg:pb-0"
	id={service.name}
>
	<div
		class="min-h-gr2 flex flex-col {index % 2
			? 'lg:flex-row-reverse'
			: 'lg:flex-row'} overflow-hidden w-full"
	>
		<div class="lg:w-gr1 h-full pt-2 pb-4 overflow-hidden">
			<div class="lg:border-b-4 border-base-content" />
			<a
				class="text-3xl lg:text-4xl font-bold base-content-focus inline-block py-4 px-4 lg:px-0"
				href="/{service.name}"><h2>{leftPad(index + 1, 2)}. {service.title}</h2></a
			>
			<div style="aspect-ratio: 1/1;">
				{#if service.image}
					<Image
						src="https://api.traist.co.uk/assets/{service.image}?file.jpg"
						aspectRatio="1/1"
						alt={service.title}
					/>
				{/if}
			</div>
		</div>
		<div class="w-full lg:w-gr2 px-4 h-full">
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
	</div>
</section>
