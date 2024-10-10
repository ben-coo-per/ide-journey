<script lang="ts">
	let { data } = $props();
	let { reflection } = data;
</script>

<div class="grid h-screen place-content-center">
	<div
		class=" container my-auto h-[500px] min-h-96 max-w-3xl overflow-auto rounded-lg border border-theme-2 border-opacity-25 bg-bg-1 p-8 text-left font-sans text-text-1"
	>
		{@html reflection.note}
	</div>
</div>
