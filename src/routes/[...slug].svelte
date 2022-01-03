<script lang="ts" context="module">
	export const load = async ({ fetch, page }) => {
		const pageRes = await fetch(
			`https://api.traist.co.uk/items/pages?filter[name][_eq]=${page.params.slug}`
		);
		const { data: pages } = await pageRes.json();
		return {
			props: { page: pages[0], slug: page.params.slug }
		};
	};
</script>

<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import CustomHeaderRenderer from '$lib/components/CustomHeaderRenderer.svelte';
	import { Image } from '@joeinnes/svelte-image';
	import SvelteMarkdown from 'svelte-markdown';
	export let page;
	export let slug = '';
	const renderers = {
		heading: CustomHeaderRenderer
	};
	let imgSrc = '';
	$: {
		imgSrc = page?.image ? `https://api.traist.co.uk/assets/${page.image}.jpg` : null;
	}
</script>

<svelte:head>
	<meta name="description" content={page.summary ? page.summary : page.content} />
	<title>Traist Web Services {page.title ? ' | ' + page.title : ''}</title>
	<link rel="canonical" href="https://traist.co.uk/{slug}" />
</svelte:head>

<Navbar />

<section class="w-full lg:w-gr2 mx-auto overflow-hidden bg-base-100 p-4 lg:p-8" id={page.name}>
	<div class="w-full  min-h-gr2 flex flex-col lg:flex-row">
		<div class="w-full lg:w-gr1 h-full pt-2 pb-4 overflow-hidden">
			<div class="lg:border-b-4 border-base-content" />
			<a
				class="text-3xl lg:text-4xl font-bold base-content-focus inline-block py-4"
				href="/{page.name}"><h2>{page.title}</h2></a
			>
			{#if page.image}
				<div style="aspect-ratio: 1/1">
					<Image
						src="https://api.traist.co.uk/assets/{page.image}?file.jpg"
						aspectRatio="1/1"
						alt={page.title}
					/>
				</div>
			{/if}
		</div>
		<div class="w-full lg:w-gr2 px-0 lg:px-8 h-full">
			<div class="mb-8 prose md:prose-xl"><SvelteMarkdown source={page.content} {renderers} /></div>
			{#if page.show_cta}
				<div>
					<a href="/pages/{page.name}" class="text-xl font-normal normal-case btn btn-primary"
						>{page.cta_text}</a
					>
				</div>
			{/if}
		</div>
	</div>
</section>
