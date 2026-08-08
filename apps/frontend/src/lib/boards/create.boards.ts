import { API_URL } from '$lib/constants';
import type { GenericBoardResponse } from './boards';

export async function createBoard(
	token: string,
	password: string,
	name: string,
	description: string
): Promise<boolean> {
	try {
		const response = await fetch(`${API_URL}/api/boards/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ password, name, description })
		});

		const json: GenericBoardResponse = await response.json();
		if (!json || json.status !== 201) return false;

		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
}
