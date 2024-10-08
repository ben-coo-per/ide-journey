<script>
	import { ScatterPlot3D } from '$lib/components/skills/ScatterPlot3D/index';
	import StarFieldBG from '$lib/components/StarFieldBG.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../../app.css';

	const { data } = $props();

	const { skills } = data;
</script>

<div class="app">
	<Header currentProject={data.project}></Header>
	<ScatterPlot3D {skills}></ScatterPlot3D>
	<main class="pb-10">
		<!-- svelte-ignore slot_element_deprecated -->
		<div class="container mx-auto flex max-w-3xl flex-col gap-0">
			<div
				class="w-full rounded-lg border border-theme-2 border-opacity-25 bg-bg-1 text-left text-sm text-text-1"
			>
				<slot></slot>
			</div>
		</div>
	</main>

	<StarFieldBG></StarFieldBG>

	<footer></footer>
</div>
