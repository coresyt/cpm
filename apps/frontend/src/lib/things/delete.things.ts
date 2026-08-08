import { API_URL } from '$lib/constants';
import type { GenericThingResponse } from './things';

export async function deleteThing(token: string, id: string, password: string): Promise<boolean> {
	try {
		const response = await fetch(`${API_URL}/things/delete/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ password })
		});

		const json: GenericThingResponse = await response.json();
		return json && json.status === 200;
	} catch (err) {
		console.error(err);
		return false;
	}
}
