<script lang="ts" context="module">
	export const load = async ({ fetch, page }) => {
		const pageRes = await fetch(
			`https://api.traist.co.uk/items/pages?filter[name][_eq]=${page.params.slug}`
		);
		const { data: pages } = await pageRes.json();
		return {
			props: { page: pages[0] }
		};
	};
</script>

<script lang="ts">
	import { Image } from '@joeinnes/svelte-image';
	import SvelteMarkdown from 'svelte-markdown';
	export let page;
	let clientWidth;
	let imgSrc = '';
	$: {
		imgSrc = page.image ? `https://api.traist.co.uk/assets/${page.image}.jpg` : null;
	}
</script>

<svelte:head><meta name="description" content={page.summary} /></svelte:head>
<div class="w-full bg-primary md:bg-base-100" bind:clientWidth>
	<!-- don't waste bandwidth downloading if the user's on mobile -->
	{#if clientWidth > 640}
		{#if imgSrc}
			{#key imgSrc}
				<Image src={imgSrc} alt={page.title} aspectRatio="32/9" />
			{/key}
		{:else}
			<div style="width: 100%; aspect-ratio: 32/9">
				<img
					src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=compress&fit=crop&w={clientWidth}&blur=75&monochrome=0C6291&bri=30&con=-30"
					alt="Default background"
					aria-hidden="true"
					style="width: 100%; height: 100%; object-fit: cover"
				/>
			</div>
		{/if}
	{/if}
	<div class="flex flex-col items-center justify-center p-8 pt-0 ">
		<div class="relative p-8 shadow-lg rounded-box top-4 sm:-top-16 bg-base-100">
			<h1 class="mb-4 text-4xl font-bold md:text-6xl">{page.title}</h1>
			<div class="mb-8 prose md:prose-xl"><SvelteMarkdown source={page.content} /></div>
			{#if page.show_cta}
				<div>
					<a href="/pages/{page.name}" class="text-xl font-normal normal-case btn btn-primary"
						>{page.cta_text}</a
					>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	:global(.prose h1) {
		@apply text-xl lg:text-3xl;
	}
</style>
