<script lang="ts">
	const { data } = $props();
	const { skill_checkpoint } = data;
</script>

<div class="flex h-12 border-b border-theme-2 border-opacity-25 px-6 py-2 align-middle">
	<button class="text-xs text-theme-2" on:click={() => window.history.back()}>← Back</button>
</div>
<div class="flex flex-col gap-2 px-6 py-4">
	<h1 class="text-2xl font-bold text-theme-2">{skill_checkpoint.skill}</h1>
	<div class="font-sans text-sm text-text-1">
		{@html skill_checkpoint.note}
	</div>
</div>
