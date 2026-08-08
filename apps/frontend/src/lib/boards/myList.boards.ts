import { API_URL } from '$lib/constants';
import type { Board, ListBoardsResponse } from './boards';

export async function myListBoards(token: string): Promise<Board[] | false> {
	try {
		const response = await fetch(`${API_URL}/boards/my-list`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		const json: ListBoardsResponse = await response.json();
		if (!json || typeof json.data !== 'object') return false;

		return json.data;
	} catch (err) {
		console.error(err);
		return false;
	}
}
