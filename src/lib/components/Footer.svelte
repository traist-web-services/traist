<script lang="ts">
	import type { NavItem } from '$lib/types/NavItem';
	export let pageTree: NavItem;

	const getSortOrder = (item: NavItem) => {
		if (!item) return;
		if (item.sort) return item.sort;
		return getSortOrder(item[Object.keys(item)[0]]);
	};

	const linkify = (item: NavItem, name?: string) => {
		if (item.id) {
			return {
				item,
				type: 'link',
				name: item.title,
				linkTo: item.name,
				sort: getSortOrder(item)
			};
		} else {
			let children = Object.keys(item);
			return {
				item,
				name,
				type: 'parent',
				sort: getSortOrder(item),
				children: children
					.map((child) => linkify(item[child], child))
					.sort((a, b) => a.sort - b.sort)
			};
		}
	};

	const { children: navArr } = linkify(pageTree);
	navArr.sort((a: NavItem, b: NavItem) => a.sort - b.sort);
</script>

<footer
	class="grid items-center gap-8 p-5 lg:p-10 grid:cols:1 lg:grid-cols-3 bg-neutral text-neutral-content"
>
	<div class="h-full lg:border-r-2 border-base-100">
		<h2 class="mb-4 text-2xl font-bold lowercase">
			traist web services &copy; {new Date().getFullYear()}
		</h2>
		<a href="mailto:hi@traist.co.uk" class="text-xl">hi@traist.co.uk</a>
	</div>
	<div class="h-full text-xl lowercase lg:border-r-2 border-base-100">
		<h2 class="text-2xl font-bold">Pages</h2>
		{#each navArr as navItem, index}
			{#if navItem.type === 'link'}
				<a class="text-xl lowercase" href="/{navItem.linkTo}">{navItem.item.title}</a>
			{:else}
				<div class="">
					<div class="lowercase">
						{navItem.name}
					</div>
					<ul class="ml-6 lowercase">
						{#each navItem.children as child, childIndex}
							<li class="py-1">
								<a href="/{child.linkTo}">{child.name}</a>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		{/each}
	</div>
	<div class="h-full lowercase">
		<h2 class="text-2xl font-bold">About</h2>
		<p>
			Traist Web Services is a digital consultancy firm building exceptional user experiences for
			small to medium businesses.
		</p>

		<h2 class="mt-4 text-xl font-bold">Personal Data</h2>

		<p>
			Traist cares about your privacy rights online. We only store data you've expressly chosen to
			share with us (eg: by sending a message through the form embedded on the site, or using the
			chat function).
		</p>
	</div>
</footer>
