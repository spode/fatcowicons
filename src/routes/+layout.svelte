<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex h-full flex-col">
	<div class="flex flex-1 flex-col overflow-auto">{@render children()}</div>
	<footer class="py-1 text-center">
		Icons by <a
			class=" hover:underline"
			href="https://web.archive.org/web/20160323032439/http://www.fatcow.com/free-icons"
			>Marcis Gasuns
		</a>
	</footer>
</div>
<svelte:head><title>Icon Gallery</title></svelte:head>
