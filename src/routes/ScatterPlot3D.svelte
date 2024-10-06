<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

	import type { PerspectiveCamera, WebGLRenderer, Scene } from 'three';
	import type { OrbitControls as OrbitControlsType } from 'three/examples/jsm/controls/OrbitControls';
	import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
	import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

	import type { Skill } from './types';

	const axisLength = 3;
	const labelSize = 0.15;

	let container: HTMLDivElement | null = null; // Container for the Three.js canvas
	let renderer: WebGLRenderer;
	let scene: Scene;
	let camera: PerspectiveCamera;
	let controls: OrbitControlsType;

	const { skills }: { skills: Skill[] } = $props();

	// Points data for the scatter plot
	const pointsData = skills.map((skill) => ({
		x: skill.interest - 4,
		y: skill.level - 4
	}));

	// Function to create an axis (X, Y, or Z)
	function createAxis(start: number[], end: number[], color: string) {
		const material = new THREE.LineBasicMaterial({ color });
		const points = [];
		points.push(new THREE.Vector3(...start)); // Starting point of the axis
		points.push(new THREE.Vector3(...end)); // End point of the axis

		const geometry = new THREE.BufferGeometry().setFromPoints(points);
		const line = new THREE.Line(geometry, material);
		return line;
	}

	async function createLabel(text: string, position: [number, number, number]) {
		const fontLoader = new FontLoader();

		const font = await new Promise((resolve, reject) => {
			fontLoader.load(
				'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
				resolve,
				undefined,
				reject
			);
		});

		const textGeometry = new TextGeometry(text, {
			font: font,
			size: labelSize,
			height: 0.05
		});

		const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
		const labelMesh = new THREE.Mesh(textGeometry, textMaterial);
		labelMesh.position.set(...position);
		return labelMesh;
	}

	onMount(async () => {
		// Scene, camera, and renderer setup
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(
			75,
			container!.clientWidth / container!.clientHeight,
			0.1,
			1000
		);
		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(container!.clientWidth, container!.clientHeight);
		renderer.setClearColor(0xffffff, 0);

		container!.appendChild(renderer.domElement);

		// Add lighting to the scene
		const light = new THREE.PointLight(0xffffff, 1, 100);
		light.position.set(10, 10, 10);
		scene.add(light);
		scene.add(new THREE.AmbientLight(0x404040));

		// Create scatter plot points
		pointsData.forEach((point) => {
			const geometry = new THREE.SphereGeometry(0.1, 32, 32); // Small spheres for points
			const material = new THREE.MeshBasicMaterial({ color: '#36D8E1' });
			const sphere = new THREE.Mesh(geometry, material);
			sphere.position.set(point.x, point.y, 0);
			scene.add(sphere);
		});

		// Create X, Y, and Z axes with range -axisLength to +axisLength
		const xAxis = createAxis([-1 * axisLength, 0, 0], [axisLength, 0, 0], '#fff');
		const yAxis = createAxis([0, -1 * axisLength, 0], [0, axisLength, 0], '#fff');

		// Add axes to the scene
		scene.add(xAxis);

		scene.add(yAxis);

		// Create axis labels (X, Y, Z)
		const xLabel = await createLabel('High Interest', [axisLength - 1.15, -0.2, -0.2]);
		const negXLabel = await createLabel('Low Interest', [-1 * (axisLength - 0.05), -0.2, -0.2]);
		const negYLabel = await createLabel('Proficient', [-0.4, axisLength + labelSize, -0.2]);
		const yLabel = await createLabel('Beginner', [-0.4, -1 * (axisLength + 2 * labelSize), -0.2]);

		scene.add(xLabel);
		scene.add(negXLabel);

		scene.add(negYLabel);
		scene.add(yLabel);

		// Camera position and controls
		camera.position.z = 5;
		controls = new OrbitControls(camera, renderer.domElement);

		// Animation loop
		const animate = () => {
			requestAnimationFrame(animate);
			controls.update();
			renderer.render(scene, camera);
		};
		animate();

		// Resize handling
		const handleResize = () => {
			const width = container!.clientWidth;
			const height = container!.clientHeight;
			renderer.setSize(width, height);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		};
		window.addEventListener('resize', handleResize);
	});

	// Use onDestroy at the root level to properly clean up resources when the component is destroyed
	onDestroy(() => {
		if (controls) controls.dispose();
		if (renderer) renderer.dispose();
	});
</script>

<!-- Container for the Three.js scene -->
<div bind:this={container} style="width: 100%; height: 500px; position: relative;"></div>

<style>
	div {
		overflow: hidden;
	}
</style>
