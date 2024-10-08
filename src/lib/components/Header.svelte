<script lang="ts">
	import type { Project } from '$lib/types';
	import ProjectSelector from './projectSelector/ProjectSelector.svelte';

	const { projects, selectedProject } = $props<{ projects: Project[]; selectedProject: Project }>();
</script>

<header
	class="absolute top-0 z-10 w-full bg-bg-2 px-10 py-2 opacity-25 shadow-lg transition-opacity duration-200 hover:opacity-80"
>
	<ProjectSelector {projects} {selectedProject}></ProjectSelector>
</header>
