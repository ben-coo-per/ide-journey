import { error, redirect } from '@sveltejs/kit';
import { getPBClient } from '$lib/utils/pb';

export async function load() {
	const pb = await getPBClient();
	const now = new Date();
	const today = now.toISOString().split('T')[0];

	const latestProject = await pb.collection('projects').getList(1, 1, {
		filter: `end_date <= "${today}"`,
		sort: 'end_date'
	});
	if (latestProject.items.length === 0) {
		error(404, 'No projects found');
	}
	const project = latestProject.items[0];

	redirect(307, project.id);
}
