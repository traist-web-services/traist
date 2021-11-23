<script lang="ts">
	import { fly } from 'svelte/transition';
	let innerWidth = 0;
	let innerHeight = 0;
	let scrollY = 0;
</script>

<svelte:window bind:innerWidth bind:innerHeight bind:scrollY />
<div class="overflow-hidden bg-primary">
	<div class="h-screen text-primary-content flex flex-col justify-end pb-4">
		{#if scrollY < 3}
			<div
				transition:fly={{
					delay: 0,
					duration: 800,
					x: innerWidth,
					y: 0,
					opacity: 1
				}}
			>
				<svg viewBox="0 0 40.2 20" fill="currentColor">
					<text x="0" y="13" font-weight="bold">traist</text>
					<text x="1" y="19" font-weight="bold" font-size="6.3px">web services</text>
				</svg>
			</div>
		{/if}
	</div>
</div>
