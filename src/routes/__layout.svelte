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
			stuff: {
				pageTree
			},
			props: {
				pageTree
			}
		};
	};
</script>

<script>
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	import '../app.css';

	export let pageTree = {};
</script>

<svelte:head
	><title>Traist Web Services</title>
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/></svelte:head
>

<div class="flex flex-col min-h-screen">
	<Navbar {pageTree} />
	<div class="flex flex-col justify-center flex-1"><slot /></div>
	<Footer {pageTree} />
</div>
