<script>
	import { onMount } from 'svelte';

	let { data } = $props();

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

<main class="flex flex-1 flex-col overflow-auto">
	{#await filteredIcons}
		<p>loading the images!</p>
	{:then icons}
		<input
			class="m-2 rounded-xl dark:bg-gray-800 dark:text-white"
			bind:this={inputElement}
			type="search"
			placeholder="search icon..."
			oninput={(e) => {
				clearTimeout(timeout);

				timeout = setTimeout(() => {
					inputText = inputElement.value;
				}, 150);
			}}
		/>
		<div
			style="scrollbar-gutter: stable;"
			class="grid h-full grid-cols-[repeat(auto-fit,minmax(min(100px,100%),1fr))] content-start gap-2 overflow-auto"
		>
			{#each icons as module}
				<a download={module.path.split('/').pop().split()} href={module.src.img.src}>
					<div
						class="flex flex-col items-center rounded-xl p-2 hover:bg-red-200 dark:hover:bg-gray-700"
					>
						<img
							style="image-rendering:pixelated"
							class="h-auto w-[64px]"
							src={module.src.img.src}
							alt="some alt text"
						/>
						<p class="line-clamp-2 text-center text-xs antialiased lg:text-sm">
							{module.path.split('/').pop()?.replace('.png', '').replaceAll('_', ' ')}
						</p>
					</div>
				</a>
			{/each}
		</div>
	{/await}
</main>
