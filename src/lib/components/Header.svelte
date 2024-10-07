<script>
	const data = $props();
	const { projects, currentProject } = data;
</script>

<header class="w-full bg-bg-2 px-10 py-2 shadow-lg">
	<div class="flex h-full w-1/3 flex-row gap-10">
		{currentProject.name}
	</div>
</header>
