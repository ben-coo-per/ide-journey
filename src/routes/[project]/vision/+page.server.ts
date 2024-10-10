import { getPBClient } from '$lib/utils/pb';

export async function load({ params }) {
	const pb = await getPBClient();
	try {
		const reflection = await pb
			.collection('reflections')
			.getFirstListItem(`project = "${params.project}"`);

		return {
			reflection
		};
	} catch (error) {
		console.log(error);
		return {
			reflection: null
		};
	}
}
