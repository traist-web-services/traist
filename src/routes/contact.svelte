<script lang="ts">
	import ContactForm from '$lib/components/ContactForm.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<svelte:head>
	<title>Traist Web Services | Contact</title>
	<link rel="canonical" href="https://traist.co.uk/contact" />
</svelte:head>

<!-- Manually create this route to add the form, ignore CMS route -->
<Navbar />
<section class="w-full lg:w-gr2 mx-auto overflow-hidden bg-base-100 p-4 lg:p-8">
	<div class="w-full  min-h-gr2 flex flex-col lg:flex-row">
		<div class="w-full lg:w-gr1 h-full pt-2 pb-4 overflow-hidden">
			<div class="lg:border-b-4 border-base-content" />
			<h1 class="text-3xl lg:text-4xl font-bold base-content-focus inline-block py-4">
				Contact Us
			</h1>
		</div>
		<div class="w-full lg:w-gr2 px-0 lg:px-8 h-full">
			<div class="mb-8 prose md:prose-xl"><ContactForm /></div>
		</div>
	</div>
</section>
