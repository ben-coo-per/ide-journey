<script lang="ts">
	import type { Skill } from './types';

	const { skills }: { skills: Skill[] } = $props();
</script>

<table class="w-full border border-theme-2 border-opacity-25 bg-bg-1 text-left text-sm text-text-1">
	<thead class="bg-bg-2 text-xs uppercase text-theme-2">
		<tr>
			<th scope="col" class="px-6 py-3">Skill</th>
			<th>Level</th>
			<th>Interest</th>
		</tr>
	</thead>
	<tbody>
		{#each skills as skill}
			<tr class="border-b border-theme-2 border-opacity-25 bg-bg-1">
				<th scope="row" class="whitespace-nowrap px-6 py-4 font-medium">
					{skill.skill}
				</th>
				<td class="px-6 py-4 opacity-85">{skill.level}</td>
				<td class="px-6 py-4 opacity-85">{skill.interest}</td>
			</tr>
		{/each}
	</tbody>
</table>
