<script lang="ts" context="module">
	// TODO: fetch from server rather than hard-coding
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
	import SuperHero from '$lib/components/SuperHero.svelte';
	import { leftPad } from '$lib/utilities';
	export let services = {};
	const serviceList = Object.keys(services).map((service) => services[service]);
</script>

<svelte:head>
	<link rel="canonical" href="https://traist.co.uk/" />
	<meta
		name="description"
		content="Traist Web Services is a digital consultancy firm building exceptional user experiences for small to medium businesses."
	/>
</svelte:head>

<SuperHero />
<Navbar />
<div class="overflow-x-hidden">
	<div class="h-screen w-screen flex flex-col justify-center">
		<Hero {mainNav} />
	</div>

	{#each serviceList as service, index}
		<div class="w-full px-2 xl:px-0 xl:w-gr2 xl:mx-auto">
			<ItemPanel {service} {index} />
		</div>
	{/each}

	<div class="w-full xl:w-gr2 mx-auto">
		<section
			class="lg:h-screen w-full bg-base-100 grid place-items-center pb-8 lg:pb-0"
			id="contact"
		>
			<div
				class="min-h-gr2 flex flex-col {serviceList.length % 2
					? 'lg:flex-row-reverse'
					: 'lg:flex-row'} overflow-hidden w-full"
			>
				<div class="lg:w-gr1 h-full pt-2 pb-4 overflow-hidden">
					<div class="lg:border-b-4 border-base-content" />
					<a
						class="text-3xl lg:text-4xl font-bold base-content-focus inline-block py-4 px-2 lg:px-0"
						href="/contact"><h2>{leftPad(serviceList.length + 1, 2)}. Contact Us</h2></a
					>
				</div>
				<div class="w-full lg:w-gr2 px-2 h-full">
					<div class="prose lg:prose-xl">
						<ContactForm />
					</div>
				</div>
			</div>
		</section>
	</div>
</div>
