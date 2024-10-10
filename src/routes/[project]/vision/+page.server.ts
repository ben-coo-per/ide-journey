import { getPBClient } from '$lib/utils/pb';

export async function load({ params }) {
	const pb = await getPBClient();

	const reflection = await pb
		.collection('reflections')
		.getFirstListItem(`project = "${params.project}"`);

	return {
		reflection
	};
}
