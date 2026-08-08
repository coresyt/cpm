import { API_URL } from '$lib/constants';
import type { ListThingsResponse, Thing } from './things';

export async function listThings(token: string, password: string): Promise<Thing[] | false> {
	try {
		const response = await fetch(`${API_URL}/things/list`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ password })
		});

		const json: ListThingsResponse = await response.json();
		if (!json || json.status !== 200 || !Array.isArray(json.data)) return false;

		return json.data;
	} catch (err) {
		console.error(err);
		return false;
	}
}
