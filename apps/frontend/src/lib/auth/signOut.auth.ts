import { API_URL } from '$lib/constants';
import type { UserSignOut } from './auth';

export async function signOut(data: UserSignOut): Promise<boolean> {
	try {
		const response = await fetch(`${API_URL}/auth/signout`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		const json = await response.json();

		if (!json || json.status !== 201) {
			return false;
		}

		return true;
	} catch (error) {
		console.error('Error during sign out:', error);
		return false;
	}
}
