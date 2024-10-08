import { getPBClient } from '$lib/utils/pb';
import { colors } from '$lib/components/skills/ScatterPlot3D/index';
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

	const skills = await pb.collection('checkpoints').getList(1, 30, {
		fields: 'expand.skill.name, expand.skill.hardness, interest, level, usefulness, note, id',
		expand: 'skill'
	});

	const skillCheckpointsWithColor = skills.items.map((item, i) => {
		return {
			skill: item.expand?.skill.name,
			interest: item.interest,
			hardness: item.expand?.skill.hardness,
			usefulness: item.usefulness,
			level: item.level,
			note: item.note,
			checkpoint_id: item.id,
			color: colors[i % colors.length]
		};
	});

	return { project, projects: projects.items, skills: skillCheckpointsWithColor };
}
