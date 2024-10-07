<script>
	let min = 0;
	let max = 10;

	let { project = $bindable() } = $props();
</script>

<input type="range" {min} {max} bind:value={project} class="slider" />

<style>
	.slider {
		-webkit-appearance: none;
		width: 100%;
		height: 4px;
		background: #ddd;
		border-radius: 2px;
		outline: none;
		opacity: 0.7;
		transition: opacity 0.2s;
	}

	.slider:hover {
		opacity: 1;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 4px;
		height: 14px;
		border-radius: 15%;
		background: #36d8e1;
		cursor: pointer;
	}

	.slider::-moz-range-thumb {
		width: 4px;
		height: 14px;
		border-radius: 15%;
		background: #36d8e1;
		cursor: pointer;
	}
</style>
