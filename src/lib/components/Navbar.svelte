<script>
	import { slide } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { getStores } from '$app/stores';
	const { page } = getStores();
	const { path } = $page;

	// To do: fetch this from the API rather than hard-coding it
	const navMenu = [
		{
			label: 'About',
			link: '/about-us',
			sort: 0
		},
		{
			label: 'We Create',
			link: '/services/create',
			sort: 1
		},
		{
			label: 'We Manage',
			link: '/services/manage',
			sort: 2
		},
		{
			label: 'We Consult',
			link: '/services/consult',
			sort: 3
		},
		{
			label: 'Contact',
			link: '/contact',
			sort: 4,
			highlight: true
		}
	];
	let showMobileNav = false;
</script>

<header
	class="flex justify-between items-center w-full lowercase py-5 sticky top-0 bg-base-100 z-20 border-primary border-b-2"
>
	<div class="h-full md:w-gr1 grid place-items-center justify-center">
		<a
			href={path === '/' ? '#home' : '/'}
			class="inline-block text-center font-bold bg-primary p-2 px-4 lg:px-8 text-primary-content tracking-widest hover:bg-primary-focus transition-colors duration-200"
			style="font-size: max(2vw, 1rem)">traist web services</a
		>
	</div>
	<nav class="w-gr2 px-5 hidden lg:block h-full">
		<ol class="flex justify-around items-center h-full">
			{#each navMenu as item}
				<li
					class={item.highlight
						? 'btn btn-primary lowercase rounded-none'
						: 'font-bold text-neutral-focus border-base-100 border-b-4 hover:border-primary transition-colors duration-200'}
					style="font-size: 1.5vw;"
				>
					<a href={item.link} on:click={() => console.log('Clicked')}>
						{item.label}
					</a>
				</li>
			{/each}
		</ol>
	</nav>
	<button class="btn btn-sm btn-ghost lg:hidden" on:click={() => (showMobileNav = !showMobileNav)}
		><svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16M4 18h16"
			/>
		</svg></button
	>
	{#if showMobileNav}
		<nav
			class="lg:hidden bg-base-100 z-50 fixed top-0 bottom-0 left-0 right-0 px-5  h-full"
			transition:slide={{ delay: 0, duration: 200 }}
		>
			<ol class="flex flex-col justify-around items-center h-full" style="font-size: 4vw;">
				<li>
					<a
						href="/"
						class="inline-block text-center font-bold bg-primary p-2 px-4 lg:px-8 text-primary-content tracking-widest hover:bg-primary-focus transition-colors duration-200"
						style="font-size: max(2vw, 1rem)">traist web services</a
					>
				</li>
				{#each navMenu as item}
					<li
						class={item.highlight
							? 'btn btn-primary lowercase rounded-none'
							: 'font-bold text-neutral-focus border-base-100 border-b-4 hover:border-primary transition-colors duration-200'}
					>
						<a
							href={item.link}
							on:click={() => {
								goto(item.link);
								showMobileNav = !showMobileNav;
							}}
						>
							{item.label}
						</a>
					</li>
				{/each}
				<li on:click={() => (showMobileNav = !showMobileNav)} class="cursor-pointer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</li>
			</ol>
		</nav>
	{/if}
</header>
<!-- empty div below is just the navigation target to avoid scrolling to the top of the page and seeing the superhero again -->
<div id="home" />
