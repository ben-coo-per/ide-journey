import { getPBClient } from '$lib/utils/pb';

import type { Project } from '$lib/types';
import type { ListResult } from 'pocketbase';

export async function load({ params }) {
	const pb = await getPBClient();

	const project = (await pb.collection('projects').getOne(params.project, {
		fields: 'id, name, end_date, project_number'
	})) as Project;

	const projects = (await pb.collection('projects').getList(1, 20, {
		fields: 'id, name, end_date, project_number'
	})) as ListResult<Project>;

	return { project, projects: projects.items };
}
