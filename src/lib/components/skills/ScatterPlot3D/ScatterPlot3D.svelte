<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

	import type { PerspectiveCamera, WebGLRenderer, Scene } from 'three';
	import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
	import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

	import type { Skill } from '../types';

	const axisLength = 3;
	const labelSize = 0.25;

	let container: HTMLDivElement | null = null; // Container for the Three.js canvas
	let renderer: WebGLRenderer;
	let scene: Scene;
	let camera: PerspectiveCamera;
	let controls: OrbitControls;

	const { skills }: { skills: Skill[] } = $props();

	let orbitTouched = $state(false);
	let resetTimeout: any;
	const resetTime = 5000; // 5 seconds timeout
	let isResetting = false;
	const resetDuration = 2; // Duration of the smooth movement in seconds

	// Points data for the scatter plot
	const pointsData = skills.map((skill) => ({
		x: skill.interest - 4,
		y: skill.level - 4,
		color: skill.color
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

		const font: any = await new Promise((resolve, reject) => {
			fontLoader.load('/src/lib/assets/PP_Supply_Sans_Regular.json', resolve, undefined, reject);
		});

		const textGeometry = new TextGeometry(text, {
			font: font,
			size: labelSize,
			height: 0.05
		});

		const textMaterial = new THREE.MeshBasicMaterial({ color: '#DDFDFF' });
		const labelMesh = new THREE.Mesh(textGeometry, textMaterial);
		labelMesh.position.set(...position);
		return labelMesh;
	}

	onMount(async () => {
		// Scene, camera, and renderer setup
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(
			50,
			container!.clientWidth / container!.clientHeight,
			0.1,
			1000
		);
		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(container!.clientWidth, container!.clientHeight);
		renderer.setClearColor('#000', 0);

		container!.appendChild(renderer.domElement);

		// Add lighting to the scene
		const ambient = new THREE.AmbientLight('white', 1.5);
		scene.add(ambient);

		const light1 = new THREE.PointLight('#DD60C5', 100, 100);
		light1.position.set(5, 6, 1);
		scene.add(light1);
		const light2 = new THREE.PointLight('#DD60C5', 100, 100);
		light2.position.set(3, 0, 5);
		scene.add(light2);

		const pulseOffsets = pointsData.map(() => Math.random() * Math.PI * 2);

		// Create scatter plot points
		pointsData.forEach((point, i) => {
			const geometry = new THREE.SphereGeometry(0.1, 32, 32);
			const material = new THREE.MeshStandardMaterial({
				opacity: 0.85,
				color: point.color,
				transparent: true
			});
			const sphere = new THREE.Mesh(geometry, material);
			sphere.position.set(point.x, point.y, 0);
			// Add a random pulse offset for each sphere
			sphere.userData.pulseOffset = pulseOffsets[i];
			sphere.userData.isSphere = true;
			scene.add(sphere);
		});

		// Create X, Y, and Z axes with range -axisLength to +axisLength
		const xAxis = createAxis([-1 * axisLength, 0, 0], [axisLength, 0, 0], '#DD60C5');
		const yAxis = createAxis([0, -1 * axisLength, 0], [0, axisLength, 0], '#DD60C5');

		// Add axes to the scene
		scene.add(xAxis);

		scene.add(yAxis);

		// Create axis labels (X, Y, Z)
		const xLabel = await createLabel('OBSESSED', [axisLength + 0.1, -0.125, 0]);
		const negXLabel = await createLabel('INDIFFERENT', [-1 * (axisLength + 2.1), -0.125, 0]);
		const negYLabel = await createLabel('PROFICIENT', [-0.9, axisLength + labelSize, 0]);
		const yLabel = await createLabel('BEGINNER', [-0.7, -1 * (axisLength + 2 * labelSize), 0]);

		scene.add(xLabel);
		scene.add(negXLabel);

		scene.add(negYLabel);
		scene.add(yLabel);

		// Camera position and controls
		camera.position.z = 8;
		controls = new OrbitControls(camera, renderer.domElement);
		const originalPosition = camera.position.clone();

		controls.addEventListener('start', () => {
			orbitTouched = true;
			isResetting = false;

			if (resetTimeout) {
				clearTimeout(resetTimeout);
			}

			// Set a new timeout to reset the camera after 5 seconds of inactivity
			resetTimeout = setTimeout(() => {
				isResetting = true;
				startCameraReset();
			}, resetTime);
		});

		function startCameraReset() {
			const startPosition = camera.position.clone(); // Capture current position
			const startTarget = controls.target.clone(); // Capture current target
			const startTime = performance.now();

			const animateReset = () => {
				if (!isResetting) return; // Stop the reset if interrupted by user input

				const elapsedTime = (performance.now() - startTime) / 1000; // Convert to seconds
				const t = Math.min(elapsedTime / resetDuration, 1); // Progress ratio (clamped between 0 and 1)

				// Smoothly interpolate the camera position
				camera.position.lerpVectors(startPosition, originalPosition, t);

				controls.update(); // Update controls with new position/target

				// If not finished, keep animating
				if (t < 1) {
					requestAnimationFrame(animateReset);
				} else {
					isResetting = false; // Reset complete
				}
			};

			// Start the reset animation
			animateReset();
		}

		function animateCamera(time: number) {
			if (orbitTouched) return;
			const radius = 8; // Fixed distance from the center
			const oscillationSpeed = 0.5; // Speed of the nudge back and forth

			const nudge = 0.1 * Math.sin(time * oscillationSpeed); // Oscillate between -maxAngle and +maxAngle

			const x = radius * Math.sin(nudge); // Slight nudge along X
			const z = radius * Math.cos(nudge); // Keep Z adjusted to maintain radius distance

			camera.position.set(x, camera.position.y, z); // Nudge the camera along X and Z
			camera.lookAt(new THREE.Vector3(0, 0, 0)); // Keep looking at the center
		}

		// Animation loop
		const animate = () => {
			requestAnimationFrame(animate);
			const time = performance.now() * 0.001; // Use time to drive the animation

			animateCamera(time);

			// Pulse the spheres by modifying their scale
			scene.children.forEach((object) => {
				if (object.userData.isSphere) {
					// Ensure we only apply to meshes (spheres)
					const scale = 1 + 0.4 * Math.sin(time + object.userData.pulseOffset) ** 2;
					object.scale.set(scale, scale, scale); // Apply scale uniformly
				}
			});

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
