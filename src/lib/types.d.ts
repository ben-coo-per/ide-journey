export type SkillCheckpoint = {
	skill: string;
	interest: number;
	hardness: number;
	usefulness: number;
	level: number;
	note?: string;
	color?: string;
	checkpoint_id: string;
};

export type Project = {
	id: string;
	name: string;
	end_date: string;
	project_number: number;
};
