<script lang="ts">
	import type { Skill } from '../types';

	const { skills }: { skills: Skill[] } = $props();
</script>

<div
	class="w-full rounded-lg border border-theme-2 border-opacity-25 bg-bg-1 text-left text-sm text-text-1"
>
	<table class="w-full">
		<thead class="rounded-lgtext-xs uppercase text-theme-2">
			<tr>
				<th scope="col" class="px-6 py-3">Skill</th>
				<th>Level <span class="opacity-75">(1-7)</span></th>
				<th>Interest <span class="opacity-75">(1-7)</span></th>
			</tr>
		</thead>
		<tbody>
			{#each skills as skill}
				<tr class="border-t border-theme-2 border-opacity-25">
					<th scope="row" class="whitespace-nowrap px-6 py-4 font-medium">
						{skill.skill}
					</th>
					<td class="px-6 py-4 opacity-85">{skill.level}</td>
					<td class="px-6 py-4 opacity-85">{skill.interest}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
