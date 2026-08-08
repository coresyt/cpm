import { API_URL } from '$lib/constants';
import type { CreateBoardTokenResponse } from './boards';

export async function createBoardToken(
	token: string,
	boardId: string,
	password: string
): Promise<string | false> {
	try {
		const response = await fetch(`${API_URL}/boards/create-token/${boardId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ password })
		});

		const json: CreateBoardTokenResponse = await response.json();
		if (!json || !json.token) return false;

		return json.token;
	} catch (err) {
		console.error(err);
		return false;
	}
}
