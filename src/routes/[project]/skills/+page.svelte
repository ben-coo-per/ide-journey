<script lang="ts">
	import { ScatterPlot3D } from '$lib/components/skills/ScatterPlot3D/index.js';
	import SkillTable from '$lib/components/skills/SkillTable/SkillTable.svelte';

	let { data } = $props();
	let skills = $derived(data.skills);
</script>

<SkillTable {skills} />
