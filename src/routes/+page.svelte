<script>
	import { onMount } from 'svelte';

	let { data } = $props();
	onMount(() => {
		// $inspect(data);
		// console.log('hello');
	});

	let inputText = $state('');

	let coolIcons = $state([]);

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			// Generate a random index between 0 and i (inclusive)
			const randomIndex = Math.floor(Math.random() * (i + 1));

			// Swap the elements at index i and randomIndex
			[array[i], array[randomIndex]] = [array[randomIndex], array[i]];
		}
		return array;
	}

	onMount(async () => {
		coolIcons = await data.icons;
		shuffleArray(coolIcons);
	});

	let filteredIcons = $derived(
		coolIcons.filter((element) => {
			return element.path.includes(inputText);
		})
	);
	let timeout;
	let inputElement = $state();
</script>

<main class="flex h-full flex-col">
	{#await filteredIcons}
		<p>loading the images!</p>
	{:then icons}
		<input
			bind:this={inputElement}
			type="text"
			oninput={(e) => {
				clearTimeout(timeout);

				timeout = setTimeout(() => {
					inputText = inputElement.value;
				}, 150);
			}}
		/>
		<div
			class="grid h-full grid-cols-[repeat(auto-fit,minmax(min(100px,100%),1fr))] gap-2 overflow-auto"
		>
			{#each icons as module}
				<a download={module.path.split('/').pop()} href={module.src.img.src}>
					<div class="flex flex-col items-center rounded-xl p-2 hover:bg-red-200">
						<img
							style="image-rendering:pixelated"
							class="h-auto w-[64px]"
							src={module.src.img.src}
							alt="some alt text"
						/>
						<p class="line-clamp-2 text-center text-xs antialiased">
							{module.path.split('/').pop()?.replace('.png', '').replaceAll('_', ' ')}
						</p>
					</div>
				</a>
			{/each}
		</div>
	{/await}
</main>

<style>
	/* img {
		width: var(--size);
		height: auto;
	} */
</style>
