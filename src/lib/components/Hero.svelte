<script>
	let clientW = 0;
</script>

<div
	class="min-h-screen hero bg-base-100"
	style="background-image: url(https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=compress&fit=crop&w={clientW}&blur=75&monochrome=0C6291&bri=30&con=-30)"
	bind:clientWidth={clientW}
>
	<div class="flex-col hero-content lg:flex-row-reverse">
		<div>
			<h1 class="py-3 text-5xl font-bold md:text-6xl lg:text-9xl">
				Your business.<br />Our solutions.
			</h1>
			<div class="max-w-3xl text-xl prose md:text-2xl lg:text-3xl;">
				<p class="mb-5  text-xl prose md:text-2xl lg:text-3xl;">
					Need a partner to help you make the most of web technologies?
				</p>
				<p class="mb-5 text-xl prose md:text-2xl lg:text-3xl;">
					Traist specialises in building bespoke solutions to maximise value across your business.
				</p>
				<button class="text-xl font-normal normal-case btn btn-primary"
					>What are you planning?</button
				>
			</div>
		</div>
	</div>
</div>
