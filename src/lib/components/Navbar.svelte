<script lang="ts">
	export let pageTree = {};

	const getSortOrder = (item) => {
		if (!item) return;
		if (item.sort) return item.sort;
		return getSortOrder(item[Object.keys(item)[0]]);
	};

	const linkify = (item, name) => {
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
	navArr.sort((a, b) => a.sort - b.sort);
</script>

<div class="relative z-10 border-b-4 shadow-lg navbar bg-base-100 text-primary border-primary">
	<a class="flex-1 px-2 mx-2" href="/">
		<span class="text-2xl font-bold lowercase">Traist Web Services</span>
	</a>
	<div class="flex-none hidden px-2 mx-2 lg:flex">
		<nav class="flex items-stretch">
			{#each navArr as navItem}
				{#if navItem.type === 'link'}
					<a class="text-2xl lowercase btn btn-ghost btn-lg rounded-btn" href="/{navItem.linkTo}"
						>{navItem.item.title}</a
					>
				{:else}
					<div class="dropdown dropdown-hover">
						<div tabindex="0" class="text-2xl lowercase btn btn-ghost btn-lg rounded-btn">
							{navItem.name}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-6 h-6 ml-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</div>
						<ul
							tabindex="0"
							class="z-0 p-2 text-2xl font-bold lowercase shadow-xl menu dropdown-content bg-base-100 rounded-box w-52 border-primary"
						>
							{#each navItem.children as child}
								<li>
									<a href="/{child.linkTo}">{child.name}</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			{/each}
		</nav>
	</div>
</div>
