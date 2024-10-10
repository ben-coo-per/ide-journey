<script lang="ts">
	import { page } from '$app/stores';
	import type { Project } from '$lib/types';
	import ProjectSelector from './projectSelector/ProjectSelector.svelte';

	const { projects, selectedProject } = $props<{ projects: Project[]; selectedProject: Project }>();
</script>

<header
	class="absolute top-0 z-10 flex w-full flex-row items-center justify-between bg-bg-1 px-10 py-2 opacity-25 shadow-lg transition-opacity duration-500 hover:bg-bg-2 hover:opacity-80"
>
	<ProjectSelector {projects} {selectedProject}></ProjectSelector>

	<div class="flex flex-row items-center gap-4">
		<a href={'skills'} class="uppercase" class:active={$page.url.pathname.includes('/skills')}
			>skills</a
		>
		<a href={'vision'} class="uppercase" class:active={$page.url.pathname.includes('/vision')}
			>reflection</a
		>
	</div>
</header>

<style>
	.active {
		@apply text-theme-2;
		text-decoration: underline;
	}
</style>
