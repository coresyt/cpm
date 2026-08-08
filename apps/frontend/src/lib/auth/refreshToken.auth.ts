import { API_URL } from '$lib/constants';

export async function refreshToken(token: string): Promise<string | false> {
	try {
		const response = await fetch(`${API_URL}/auth/refresh-token`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		});

		const json = await response.json();

		if (!json || typeof json.newToken !== 'string') {
			return false;
		}

		return json.newToken;
	} catch (error) {
		console.error('Error during token refresh:', error);
		return false;
	}
}
