<script lang="ts">
	import type { Project } from '$lib/types';
	import { fly, slide } from 'svelte/transition';

	let { project, isSelected, handleSelect } = $props<{
		project: Project;
		isSelected: boolean;
		handleSelect: (project: Project) => void;
	}>();
</script>

<button
	class="flex flex-row items-center gap-0 transition-all duration-700"
	class:bg-theme-2={isSelected}
	class:bg-opacity-25={isSelected}
	onclick={() => handleSelect(project)}
>
	<span class="p-2 text-sm" class:text-theme-2={!isSelected}>{project.project_number}</span>
	{#if isSelected}
		<div
			class="title-wrapper"
			in:slide={{ axis: 'x', duration: 400 }}
			out:slide={{ axis: 'x', duration: 400, delay: 150 }}
		>
			<div
				class="title"
				in:fly={{ x: -50, duration: 500, delay: 150 }}
				out:fly={{ x: -50, duration: 500 }}
			>
				<span class="text-nowrap p-2 pl-0 text-sm text-text-1">{project.name}</span>
			</div>
		</div>
	{/if}
</button>
