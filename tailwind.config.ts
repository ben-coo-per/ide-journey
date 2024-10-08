import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'bg-1': '#11141c',
				'bg-2': '#252a36',
				'text-1': '#DDFDFF',
				'text-2': '#B3E4E6',
				'theme-1': '#36D8E1',
				'theme-2': '#DD60C5',
				'theme-3': '#1D54C4',
				'theme-4': '#159774'
			}
		}
	},

	plugins: []
} as Config;
