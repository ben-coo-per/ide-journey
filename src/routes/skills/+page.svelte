<script lang="ts">
	import SkillTable from '$lib/components/skills/SkillTable/SkillTable.svelte';
	import ScatterPlot3D from '$lib/components/skills/ScatterPlot3D/ScatterPlot3D.svelte';
	import StarFieldBG from '$lib/components/StarFieldBG.svelte';
	const { data } = $props();
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Ben's IDE Journey" />
</svelte:head>

<ScatterPlot3D skills={data.skills}></ScatterPlot3D>
<div class="container mx-auto flex flex-col gap-0">
	<SkillTable skills={data.skills} />
</div>

<StarFieldBG></StarFieldBG>
