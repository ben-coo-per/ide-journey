<script lang="ts">
	import SkillTable from './SkillTable.svelte';
	import ScatterPlot3D from './ScatterPlot3D.svelte';
	const { data } = $props();
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Ben's IDE Journey" />
</svelte:head>

<div class="max-lg: container mx-auto flex flex-col gap-0">
	<ScatterPlot3D skills={data.skills}></ScatterPlot3D>
	<SkillTable skills={data.skills} />
</div>
