<script lang="ts">
	import { ScatterPlot3D } from '$lib/components/skills/ScatterPlot3D/index.js';
	import SkillTable from '$lib/components/skills/SkillTable/SkillTable.svelte';

	let { data } = $props();
	let skills = $derived(data.skills);
</script>

<ScatterPlot3D {skills}></ScatterPlot3D>
<div class="container mx-auto flex max-w-3xl flex-col gap-0">
	<div
		class="w-full rounded-lg border border-theme-2 border-opacity-25 bg-bg-1 text-left text-sm text-text-1"
	>
		<slot></slot>
	</div>
</div>
