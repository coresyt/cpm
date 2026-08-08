import { API_URL } from '$lib/constants';
import type { UserSignIn } from './auth';

export async function signIn(user: UserSignIn): Promise<[string, boolean] | false> {
	console.log({ user, userStringify: JSON.stringify(user) });

	try {
		const response = await fetch(`${API_URL}/auth/signin`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(user)
		});

		const json = await response.json();

		if (!json || typeof json.token !== 'string') {
			return false;
		}

		if (json.message && json.status === 400 && response.status) return [json.message, false];

		return [json.token, true];
	} catch (error) {
		console.error('Error during signup:', error);
		return false;
	}
}
