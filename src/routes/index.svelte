<script lang="ts" context="module">
	const mainNav = [
		{
			id: 0,
			label: 'We Create',
			link: '#services/create'
		},
		{
			id: 1,
			label: 'We Manage',
			link: '#services/manage'
		},
		{
			id: 2,
			label: 'We Consult',
			link: '#services/consult'
		},
		{
			id: 3,
			label: 'Contact',
			link: '#contact'
		}
	];
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
	import ContactForm from '$lib/components/ContactForm.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import ItemPanel from '$lib/components/ItemPanel.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { leftPad } from '$lib/utilities';
	export let services = {};
	const serviceList = Object.keys(services).map((service) => services[service]);
</script>

<div class="h-screen w-screen flex flex-col justify-center">
	<Navbar />
	<Hero {mainNav} />
</div>

<div class="h-24 bg-base-200 border-t" />

<div class="w-full bg-base-200 ">
	{#each serviceList as service, index}
		<div class="w-full lg:w-gr2 mx-auto border-r border-l border-t border-b">
			<ItemPanel {service} {index} />
		</div>
		<div class="h-24 bg-base-200" />
	{/each}
</div>

<div class="w-full bg-base-200 ">
	<div
		class="w-full lg:w-gr2 mx-auto border-t border-b border-r border-l bg-base-100 py-12 px-5"
		id="contact"
	>
		<h1 class="text-4xl lg:text-5xl font-bold py-5">
			{leftPad(serviceList.length + 1, 2)}. Contact Us!
		</h1>
		<ContactForm />
	</div>
</div>

<div class="h-24 bg-base-200" />
<!--<Carousel items={services} />

<div
	class="max-w-5xl p-4 mx-6 my-8 border-4 shadow-2xl lg:mx-auto lg:my-16 lg:py-12 md:px-8 lg:px-16 card border-primary"
>
	
</div>
-->
