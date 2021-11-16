<script lang="ts" context="module">
	export const load = async ({ fetch }) => {
		/* Don't really need to load the content, request only fields needed: name, title, summary, image, cta_text, show_cta */
		const pagesRes = await fetch('https://api.traist.co.uk/items/pages');
		const { data: pages } = await pagesRes.json();

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
	import { browser } from '$app/env';

	import '../app.css';

	export let pageTree = {};

	if (browser) {
		const d = document;
		const t = 'script';
		var BASE_URL = 'https://app.chatwoot.com';
		var g = d.createElement(t),
			s = d.getElementsByTagName(t)[0];
		g.src = BASE_URL + '/packs/js/sdk.js';
		s.parentNode.insertBefore(g, s);
		g.onload = function () {
			(window as any).chatwootSDK.run({
				websiteToken: 'GoXSXNe3NBNNVW2gVcndEAQG',
				baseUrl: BASE_URL
			});
		};
		const analytics = d.createElement(t);
		analytics.dataset.accountId = '7fee67fa-6c6e-416f-abbb-3f39cc0dee02';
		analytics.src = 'https://offen.traist.co.uk/script.js';
		s.parentNode.insertBefore(analytics, s);
	}
</script>

<svelte:head><title>Traist Web Services</title></svelte:head>
<Navbar {pageTree} />
<slot />
<Footer {pageTree} />
