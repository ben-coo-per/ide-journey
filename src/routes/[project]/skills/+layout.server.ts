import { getPBClient } from '$lib/utils/pb';
import { colors } from '$lib/components/skills/ScatterPlot3D/index';

export async function load({ params }) {
	const pb = await getPBClient();

	const skills = await pb.collection('checkpoints').getList(1, 30, {
		fields:
			'expand.skill.name, expand.skill.hardness, interest, level, usefulness, note, id, project',
		expand: 'skill',
		filter: `project = "${params.project}"`
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

	return { skills: skillCheckpointsWithColor };
}
