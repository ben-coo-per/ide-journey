<script lang="ts">
	import SkillTable from '$lib/components/skills/SkillTable/SkillTable.svelte';

	const { data } = $props();
	const { skills } = data;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Ben's IDE Journey" />
</svelte:head>

<SkillTable {skills} />
