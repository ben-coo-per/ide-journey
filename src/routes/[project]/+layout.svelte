<script lang="ts">
	import { ScatterPlot3D } from '$lib/components/skills/ScatterPlot3D/index';
	import StarFieldBG from '$lib/components/StarFieldBG.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../../app.css';

	const { data } = $props();

	const { projects, project } = data;
</script>

<div class="app">
	<Header selectedProject={project} {projects}></Header>
	<main class="pb-10">
		<!-- svelte-ignore slot_element_deprecated -->
		<slot></slot>
	</main>

	<StarFieldBG></StarFieldBG>

	<footer></footer>
</div>
