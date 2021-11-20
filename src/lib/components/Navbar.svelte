<script lang="ts">
	import { Github, Twitter } from './Icons/index';
</script>

<!--<script lang="ts">
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
</script>-->

<nav class="lg:h-gr1 flex flex-col md:flex-row items-center justify-between">
	<div
		class="h-full lg:border-b bg-base-200 md:w-gr1 flex items-center justify-center border-collapse mb-4 lg:mb-0"
	>
		<a
			href="/"
			class="inline font-bold bg-primary p-2 px-4 lg:px-8 text-primary-content text-lg md:text-xl lg:text-2xl tracking-widest hover:bg-primary-focus transition-colors duration-200"
			>traist web services</a
		>
	</div>
	<div class="md:w-gr2 flex flex-col justify-center items-center lg:border-l lg:border-b h-full">
		<div
			class="grid grid-flow-col gap-4 justify-center bg-base-100 border-content items-center h-8 mb-2"
		>
			<Github /><Twitter />
		</div>
		<a
			href="mailto:hi@traist.co.uk"
			class="hover:text-primary transition-colors duration-200 text-xl lg:text-2xl"
			>hi@traist.co.uk</a
		>
	</div>
</nav>
