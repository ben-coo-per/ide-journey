import { SECRET_PB_EMAIL, SECRET_PB_PASSWORD } from '$env/static/private';
import PocketBase from 'pocketbase';

export async function getPBClient() {
	const pb = new PocketBase('http://127.0.0.1:8090');
	await pb.admins.authWithPassword(SECRET_PB_EMAIL, SECRET_PB_PASSWORD);

	return pb;
}
