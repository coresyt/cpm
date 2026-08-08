import { API_URL } from '$lib/constants';

export async function setUserRole(
	token: string,
	userId: string,
	password: string,
	role: 'admin' | 'setter' | 'viewer'
): Promise<string | false> {
	try {
		const response = await fetch(`${API_URL}/user/set-role/${userId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ password, role })
		});

		const json = await response.json();

		if (!json || json.status !== 200) {
			return false;
		}

		return json.message;
	} catch (error) {
		console.error('Error during setUserRole:', error);
		return false;
	}
}
