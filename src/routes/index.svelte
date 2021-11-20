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

<div
	class="max-w-5xl p-4 mx-6 my-8 border-4 shadow-2xl lg:mx-auto lg:my-16 lg:py-12 md:px-8 lg:px-16 card border-primary"
>
	<ContactForm />
</div>
