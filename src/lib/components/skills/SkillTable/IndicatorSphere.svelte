<script>
	export let color = '#36D8E1'; // Default color, but can be overridden
</script>

<div class="sphere" style="--color: {color}"></div>

<style>
	.sphere {
		width: 15px;
		height: 15px;
		background-color: var(--color);
		border-radius: 50%;
		box-shadow:
			inset -10px -10px 20px rgba(0, 0, 0, 0.2),
			inset 10px 10px 20px rgba(255, 255, 255, 0.2),
			0 0 20px rgba(0, 0, 0, 0.2);
		display: inline-block;
	}
</style>
