import { API_URL } from '$lib/constants';
import type { GenericBoardResponse } from './boards';

export async function setBoardIp(
	token: string,
	boardId: string,
	password: string,
	ip: string
): Promise<boolean> {
	try {
		const response = await fetch(`${API_URL}/boards/set-ip/${boardId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ password, ip })
		});

		const json: GenericBoardResponse = await response.json();
		if (!json || json.status !== 200) return false;

		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
}
