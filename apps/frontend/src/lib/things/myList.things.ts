import { API_URL } from '$lib/constants';
import type { ListThingsResponse, Thing } from './things';

export async function myListThings(token: string): Promise<Thing[] | false> {
	try {
		const response = await fetch(`${API_URL}/things/my-list`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		const json: ListThingsResponse = await response.json();
		if (!json || typeof json.data !== 'object') return false;

		return json.data;
	} catch (err) {
		console.error(err);
		return false;
	}
}
