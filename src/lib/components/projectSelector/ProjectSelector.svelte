<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Project } from '$lib/types';
	import ProjectTab from './ProjectTab.svelte';

	let { selectedProject = $bindable(), projects } = $props<{
		selectedProject: Project;
		projects: Project[];
	}>();

	function handleSelect(project: Project) {
		selectedProject = project;
		goto(`/${project.id}`);
	}
</script>

<div
	class="flex h-full w-min flex-row gap-0 divide-x divide-theme-2 rounded-sm border border-theme-2"
>
	{#each projects as project}
		<ProjectTab {project} isSelected={project.id === selectedProject.id} {handleSelect}
		></ProjectTab>
	{/each}
</div>
