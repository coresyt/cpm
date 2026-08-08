import { API_URL } from '$lib/constants';
import type { Account } from './users';

export async function getUsers(token: string): Promise<Account[] | false> {
	try {
		const response = await fetch(`${API_URL}/user/list`, {
			headers: { authorization: `Bearer ${token}` }
		});

		const json = await response.json();

		if (!json || json.status !== 200 || !json.users) {
			return false;
		}

		return json.users;
	} catch (error) {
		console.error('Error during getUsers:', error);
		return false;
	}
}
