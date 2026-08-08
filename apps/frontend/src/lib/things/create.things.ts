import { API_URL } from '$lib/constants';
import type { GenericThingResponse, ThingCreating } from './things';

export async function createThing<T = never>(
	token: string,
	password: string,
	thing: ThingCreating<T>
): Promise<boolean> {
	try {
		const response = await fetch(`${API_URL}/things/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ password, ...thing })
		});

		const json: GenericThingResponse = await response.json();
		return json && json.status === 200;
	} catch (err) {
		console.error(err);
		return false;
	}
}
