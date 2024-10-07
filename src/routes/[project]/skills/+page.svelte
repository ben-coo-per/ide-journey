<script lang="ts">
	import SkillTable from '$lib/components/skills/SkillTable/SkillTable.svelte';

	const { data } = $props();
	const { skills } = data;
</script>

<SkillTable {skills} />
