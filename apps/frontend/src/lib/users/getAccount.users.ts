import { API_URL } from '$lib/constants';
import type { Account } from './users';

export async function getAccount(token: string): Promise<Account | false> {
	try {
		const response = await fetch(`${API_URL}/user/account`, {
			headers: { authorization: `Bearer ${token}` }
		});

		const json = await response.json();

		if (!json || json.status !== 200 || !json.account) {
			return false;
		}

		return json.account;
	} catch (error) {
		console.error('Error during getAccount:', error);
		return false;
	}
}
