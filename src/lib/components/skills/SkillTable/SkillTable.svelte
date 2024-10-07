<script lang="ts">
	import type { SkillCheckpoint } from '../types';
	import IndicatorSphere from './IndicatorSphere.svelte';

	const { skills }: { skills: SkillCheckpoint[] } = $props();
</script>

<table class="w-full">
	<thead class="h-12 rounded-lg text-xs uppercase text-theme-2">
		<tr>
			<th class="px-6 py-3">Skill</th>
			<th>Level <span class="opacity-75">(1-7)</span></th>
			<th>Interest <span class="opacity-75">(1-7)</span></th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		{#each skills as skill}
			<tr class="border-t border-theme-2 border-opacity-25">
				<th
					scope="row"
					class="text-md flex flex-row gap-3 whitespace-nowrap px-6 py-4 align-middle font-medium"
				>
					<IndicatorSphere color={skill.color}></IndicatorSphere>
					{skill.skill}
				</th>
				<td class="text-md px-6 py-4 opacity-85">{skill.level}</td>
				<td class=" text-md px-6 py-4 opacity-85">{skill.interest}</td>
				<td class="pr-2">
					{#if skill.note}
						<a
							data-sveltekit-preload-data="hover"
							href={`skills/${skill.checkpoint_id}`}
							class="text-lg"
						>
							💬
						</a>
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
