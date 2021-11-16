<script lang="ts" context="module">
	export const load = async ({ stuff }) => {
		const { services } = stuff.pageTree;
		return {
			props: {
				services
			}
		};
	};
</script>

<script lang="ts">
	import Carousel from '$lib/components/Carousel.svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import Hero from '$lib/components/Hero.svelte';
	export let services = {};
</script>

<Hero />
<Carousel items={services} />

<div class="max-w-5xl px-16 py-12 mx-auto my-16 border-4 shadow-2xl card border-primary">
	<ContactForm />
</div>
