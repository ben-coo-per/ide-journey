import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	redirect(307, `/${params.project}/skills`);
}
