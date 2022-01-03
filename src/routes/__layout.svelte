<script lang="ts" context="module">
	export const load = async ({ fetch }) => {
		/* Don't really need to load the content, request only fields needed: name, title, summary, image, cta_text, show_cta */
		const pagesRes = await fetch('https://api.traist.co.uk/items/pages');
		const { data: pages = [] } = await pagesRes.json();

		const pageTree = {
			services: {}
		};
		for (const page of pages) {
			const [parentName, name] = page.name?.split('/');
			if (name) {
				if (!pageTree[parentName]) {
					pageTree[parentName] = {};
				}
				pageTree[parentName][name] = page;
			} else {
				pageTree[parentName] = page;
			}
		}

		return {
			props: {
				pageTree
			},
			stuff: {
				pageTree
			}
		};
	};
</script>

<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import type { NavItem } from '$lib/types/NavItem';
	import JumpToTop from '$lib/components/JumpToTop.svelte';
	export let pageTree: NavItem;
</script>

<svelte:head
	><title>Traist Web Services</title>
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/></svelte:head
>

<!-- <div class="flex flex-col min-h-screen">
	<Navbar {pageTree} />
	<div class="flex flex-col justify-center flex-1">
	-->

<slot />

<Footer {pageTree} />
<JumpToTop />
<!--</div>
	
</div>-->
