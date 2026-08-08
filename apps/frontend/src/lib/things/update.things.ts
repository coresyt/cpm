import { API_URL } from '$lib/constants';
import type { GenericThingResponse } from './things';

export async function updateThing(
	token: string,
	id: string,
	password: string,
	name: string,
	type: 'output' | 'input'
): Promise<boolean> {
	try {
		const response = await fetch(`${API_URL}/things/update/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ password, name, type })
		});

		const json: GenericThingResponse = await response.json();
		return json && json.status === 200;
	} catch (err) {
		console.error(err);
		return false;
	}
}
