<script lang="ts">
	import SkillTable from '$lib/components/skills/SkillTable/SkillTable.svelte';
	import { ScatterPlot3D, colors } from '$lib/components/skills/ScatterPlot3D/index';
	import StarFieldBG from '$lib/components/StarFieldBG.svelte';
	const { data } = $props();
	const skillsWithColor = $derived(
		data.skills.map((skill, i) => ({
			...skill,
			color: colors[i % colors.length]
		}))
	);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Ben's IDE Journey" />
</svelte:head>

<ScatterPlot3D skills={skillsWithColor}></ScatterPlot3D>
<div class="container mx-auto flex flex-col gap-0">
	<SkillTable skills={skillsWithColor} />
</div>

<StarFieldBG></StarFieldBG>
