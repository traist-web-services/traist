<script>
	export let depth = 1;
	export let raw;
	depth = depth + 1;
</script>

<!-- Don't want to modify too much, but depth should never be less than 2 -->
{#if depth === 1}
	<h1><slot /></h1>
{:else if depth === 2}
	<h2><slot /></h2>
{:else if depth === 3}
	<h3><slot /></h3>
{:else if depth === 4}
	<h4><slot /></h4>
{:else if depth === 5}
	<h5><slot /></h5>
{:else if depth === 6}
	<h6><slot /></h6>
{:else}
	{raw}
{/if}

<style>
	h2 {
		@apply text-xl lg:text-3xl;
	}
</style>
