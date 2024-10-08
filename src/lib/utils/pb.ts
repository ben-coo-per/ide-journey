import { SECRET_PB_EMAIL, SECRET_PB_PASSWORD } from '$env/static/private';
import { PUBLIC_PB_URL } from '$env/static/public';
import PocketBase from 'pocketbase';

export async function getPBClient() {
	const pb = new PocketBase(PUBLIC_PB_URL);
	await pb.admins.authWithPassword(SECRET_PB_EMAIL, SECRET_PB_PASSWORD);

	return pb;
}
