import { API_URL } from '$lib/constants';
import type { UserChangePassword } from './auth';

export async function changePassword(token: string, data: UserChangePassword): Promise<boolean> {
	try {
		const response = await fetch(`${API_URL}/auth/change-password`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(data)
		});

		const json = await response.json();

		if (!json || json.status !== 201) {
			return false;
		}

		return true;
	} catch (error) {
		console.error('Error during password change:', error);
		return false;
	}
}
