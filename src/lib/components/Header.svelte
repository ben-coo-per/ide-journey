<script>
	const data = $props();
	const { projects, currentProject } = data;
</script>

<header
	class="absolute top-0 z-10 w-full bg-bg-2 px-10 py-2 opacity-25 shadow-lg transition-opacity duration-200 hover:opacity-80"
>
	<div class="flex h-full w-1/3 flex-row gap-10">
		{currentProject.name}
	</div>
</header>
