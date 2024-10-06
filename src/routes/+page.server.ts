import { SECRET_PB_EMAIL, SECRET_PB_PASSWORD } from '$env/static/private';
import PocketBase from 'pocketbase';

export const load = async () => {
	const pb = new PocketBase('http://127.0.0.1:8090');
	await pb.admins.authWithPassword(SECRET_PB_EMAIL, SECRET_PB_PASSWORD);

	// const data = await pb.collection('checkpoints').getList(0, 10, { expand: 'skill, project' });

	const data = await pb.collection('checkpoints').getList(1, 30, {
		fields: 'expand.skill.name, expand.skill.hardness, interest, level, usefulness',
		expand: 'skill'
	});

	const skills = data.items.map((item) => {
		return {
			skill: item.expand?.skill.name,
			interest: item.interest,
			hardness: item.expand?.skill.hardness,
			usefulness: item.usefulness,
			level: item.level
		};
	});

	return {
		skills
	};
};
