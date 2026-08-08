import { API_URL } from '$lib/constants';

export async function deleteUser(
	token: string,
	userId: string,
	password: string
): Promise<string | false> {
	try {
		const response = await fetch(`${API_URL}/user/delete/${userId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ password })
		});

		const json = await response.json();

		if (!json || json.status !== 200) {
			return false;
		}

		return json.message;
	} catch (error) {
		console.error('Error during deleteUser:', error);
		return false;
	}
}
