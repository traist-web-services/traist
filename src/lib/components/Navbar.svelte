<script lang="ts">
	type NavItem = {
		item: NavItem;
		name: string;
		type: 'link' | 'parent';
		linkTo?: string;
		sort: number;
		children?: NavItem[];
	};
	export let pageTree;

	const getSortOrder = (item: NavItem) => {
		if (!item) return;
		if (item.sort) return item.sort;
		return getSortOrder(item[Object.keys(item)[0]]);
	};

	const linkify = (item: NavItem, name?: string): NavItem => {
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
	<div class="dropdown dropdown-right lg:hidden">
		<div tabindex="0" class="m-1 btn btn-ghost">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-6 h-6"
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
			</svg>
		</div>
		<ul tabindex="0" class="p-2 text-xl shadow menu dropdown-content bg-base-100 rounded-box w-52">
			<li><span class="font-bold lowercase">Links</span></li>
			{#each navArr as navItem}
				{#if navItem.type === 'link'}
					<li>
						<a class="lowercase" href="/{navItem.linkTo}">
							{navItem.item.title}
						</a>
					</li>
				{:else}
					<li>
						<span>{navItem.name}</span>
						<ul tabindex="0" class="lowercase ">
							{#each navItem.children as child}
								<li class="py-1">
									<a href="/{child.linkTo}">{child.name}</a>
								</li>
							{/each}
						</ul>
					</li>
				{/if}
			{/each}
		</ul>
	</div>
	<a class="px-2 mx-2 lg:flex-1" href="/">
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
