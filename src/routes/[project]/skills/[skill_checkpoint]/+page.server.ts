import { getPBClient } from '$lib/utils/pb';

export async function load({ params }) {
	const pb = await getPBClient();

	const skill_checkpoint = await pb.collection('checkpoints').getOne(params.skill_checkpoint, {
		fields: 'expand.skill.name, expand.skill.hardness, interest, level, usefulness, note',
		expand: 'skill'
	});

	return {
		skill_checkpoint: {
			skill: skill_checkpoint.expand?.skill.name,
			interest: skill_checkpoint.interest,
			hardness: skill_checkpoint.expand?.skill.hardness,
			usefulness: skill_checkpoint.usefulness,
			level: skill_checkpoint.level,
			note: skill_checkpoint.note,
			checkpoint_id: skill_checkpoint.id
		}
	};
}
