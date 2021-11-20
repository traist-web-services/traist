<script lang="ts">
	import { fly } from 'svelte/transition';
	let formData = {
		name: '',
		email: '',
		message: ''
	};

	let error = null;
	let success = null;

	const submissionHandler = async () => {
		const { name, email, message } = formData;
		if (name && email && email.indexOf('@') > -1 && message) {
			try {
				const res = await fetch('https://api.traist.co.uk/items/form_submissions', {
					method: 'POST',
					body: JSON.stringify(formData),
					headers: {
						'Content-Type': 'application/json'
					}
				});
				success = true;
				formData = {
					name: '',
					email: '',
					message: ''
				};
				setTimeout(() => {
					success = null;
				}, 5000);
				console.error('Form submission failed');
			} catch (e) {
				error = true;
				setTimeout(() => {
					error = null;
				}, 3000);
				console.error(e);
			}
		}
		// No else block, the browser should help validate
	};
</script>

<form on:submit|preventDefault={submissionHandler}>
	<div class="form-control">
		<label class="label" for="name">Name</label>
		<input
			bind:value={formData.name}
			name="name"
			class="input input-primary input-bordered"
			required
		/>
	</div>
	<div class="form-control">
		<label class="label" for="email">Email</label>
		<input
			bind:value={formData.email}
			name="email"
			class="input input-primary input-bordered"
			required
			type="email"
		/>
	</div>
	<div class="mb-4 form-control">
		<label class="label" for="message">Message</label>
		<textarea
			bind:value={formData.message}
			name="message"
			required
			class="h-32 md:h-64 input input-primary input-bordered"
		/>
	</div>
	<div class="flex">
		<button
			type="submit"
			class="bg-primary hover:bg-primary-focus text-primary-content px-2 py-2 transition-colors duration-200 text-xl"
			>Send us a message!</button
		>
		{#if error}
			<div class="flex-1 alert alert-error" transition:fly>
				<div class="flex-1">
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
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
					<span>Your form could not be submitted! Did you fill in every field correctly?</span>
				</div>
			</div>
		{/if}
		{#if success}
			<div class="flex-1 alert alert-success bg-neutral" transition:fly>
				<div class="flex-1">
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
							d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
						/>
					</svg>
					<span>Your form was submitted! Someone will be in touch shortly.</span>
				</div>
			</div>
		{/if}
	</div>
</form>

<style>
	.label,
	button {
		@apply md:text-2xl;
	}

	input,
	textarea {
		border-radius: 0;
	}
</style>
