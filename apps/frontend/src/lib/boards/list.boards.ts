import { API_URL } from '$lib/constants';
import type { Board, ListBoardsResponse } from './boards';

export async function listBoards(token: string, password: string): Promise<Board[] | false> {
	try {
		const response = await fetch(`${API_URL}/boards/list`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ password })
		});

		const json: ListBoardsResponse = await response.json();
		if (!json || typeof json.data !== 'object') return false;

		return json.data;
	} catch (err) {
		console.error(err);
		return false;
	}
}
